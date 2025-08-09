# src/backend/data_processing/predictor.py

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder
from config import PredictionConfig
import warnings

warnings.filterwarnings("ignore")

# Intentar importar Prophet (opcional)
try:
    from prophet import Prophet

    PROPHET_AVAILABLE = True
    print("✅ Prophet disponible para predicciones avanzadas")
except ImportError:
    PROPHET_AVAILABLE = False
    print("⚠️ Prophet no disponible. Solo predicciones ML activas")


class EnergyPredictor:
    """Sistema de predicciones de energía integrado con el EDA existente"""

    def __init__(self, df):
        """Inicializar el predictor"""
        # Validar datos
        PredictionConfig.validate_dataframe(df)

        self.df = df.copy()
        self.models = {}
        self.predictions = {}
        self.metrics = {}
        self.feature_importance = {}

        # Preparar datos automáticamente
        self._prepare_data()

    def _prepare_data(self):
        """Preparar y enriquecer los datos para predicciones"""
        print("\n🔄 Preparando datos para predicción...")

        # Asegurar formato correcto de fecha
        self.df["fecha"] = pd.to_datetime(self.df["fecha"])
        self.df = self.df.sort_values(["departamento", "tecnologia", "fecha"]).reset_index(drop=True)

        # Crear características temporales básicas
        self.df["año"] = self.df["fecha"].dt.year
        self.df["mes"] = self.df["fecha"].dt.month
        self.df["trimestre"] = self.df["fecha"].dt.quarter
        self.df["semana_año"] = self.df["fecha"].dt.isocalendar().week
        self.df["dia_año"] = self.df["fecha"].dt.dayofyear

        # Características cíclicas para capturar estacionalidad
        self.df["mes_sin"] = np.sin(2 * np.pi * self.df["mes"] / 12)
        self.df["mes_cos"] = np.cos(2 * np.pi * self.df["mes"] / 12)
        self.df["semana_sin"] = np.sin(2 * np.pi * self.df["semana_año"] / 52)
        self.df["semana_cos"] = np.cos(2 * np.pi * self.df["semana_año"] / 52)

        # Encoding de variables categóricas
        self.le_dept = LabelEncoder()
        self.le_tech = LabelEncoder()

        self.df["dept_encoded"] = self.le_dept.fit_transform(self.df["departamento"])
        self.df["tech_encoded"] = self.le_tech.fit_transform(self.df["tecnologia"])

        # Crear características de lags y estadísticas móviles por grupo
        self.df = self.df.sort_values(["departamento", "tecnologia", "fecha"])

        # Lags (valores pasados)
        for lag in PredictionConfig.PREDICTION_CONFIG["lags"]:
            self.df[f"produccion_lag_{lag}"] = self.df.groupby(
                ["departamento", "tecnologia"]
            )["produccion_mwh"].shift(lag)

        # Estadísticas móviles (¡ELIMINA ESTE BLOQUE!)
        # for window in PredictionConfig.PREDICTION_CONFIG["rolling_windows"]:
        #     self.df[f"produccion_ma_{window}"] = (
        #         self.df.groupby(["departamento", "tecnologia"])["produccion_mwh"]
        #         .rolling(window)
        #         .mean()
        #         .reset_index(0, drop=True)
        #     )

        # Calcular medias móviles y lags (DEJA SOLO ESTE BLOQUE)
        for window in [4, 8]:
            self.df[f"produccion_ma_{window}"] = (
                self.df.groupby(["departamento", "tecnologia"])["produccion_mwh"]
                .transform(lambda x: x.rolling(window, min_periods=1).mean())
            )

        print(f"✅ Datos preparados: {self.df.shape}")
        print(
            f"📊 Características creadas: {len([col for col in self.df.columns if 'lag' in col or 'ma' in col or 'sin' in col or 'cos' in col])}"
        )

    def predict_with_ml(self, horizon_weeks=None):
        """Predicciones usando Machine Learning (Random Forest)"""
        if horizon_weeks is None:
            horizon_weeks = PredictionConfig.PREDICTION_CONFIG["default_horizon_weeks"]

        print(f"\n🤖 Ejecutando predicciones ML ({horizon_weeks} semanas)...")

        # Definir características para el modelo
        feature_columns = [
            "dept_encoded",
            "tech_encoded",
            "mes",
            "trimestre",
            "semana_año",
            "mes_sin",
            "mes_cos",
            "semana_sin",
            "semana_cos",
            "produccion_lag_1",
            "produccion_lag_2",
            "produccion_ma_4",
        ]

        # Filtrar datos sin valores nulos
        clean_data = self.df.dropna(subset=feature_columns + ["produccion_mwh"])

        if len(clean_data) < PredictionConfig.PREDICTION_CONFIG["min_data_points"]:
            print(
                f"❌ Datos insuficientes. Mínimo requerido: {PredictionConfig.PREDICTION_CONFIG['min_data_points']}"
            )
            return None

        # Preparar características y objetivo
        X = clean_data[feature_columns]
        y = clean_data["produccion_mwh"]

        # División temporal (no aleatoria para series de tiempo)
        split_idx = int(len(clean_data) * (1 - PredictionConfig.ML_CONFIG["test_size"]))
        X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
        y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

        # Configurar y entrenar modelo Random Forest
        rf_config = {
            k: v for k, v in PredictionConfig.ML_CONFIG.items() if k != "test_size"
        }
        rf_model = RandomForestRegressor(**rf_config)

        print("   🔧 Entrenando modelo Random Forest...")
        rf_model.fit(X_train, y_train)

        # Evaluación en conjunto de prueba
        y_pred = rf_model.predict(X_test)

        # Calcular métricas
        self.metrics["ml"] = {
            "mae": mean_absolute_error(y_test, y_pred),
            "rmse": np.sqrt(mean_squared_error(y_test, y_pred)),
            "r2": r2_score(y_test, y_pred),
            "mape": np.mean(np.abs((y_test - y_pred) / y_test)) * 100,
        }

        # Importancia de características
        self.feature_importance["ml"] = pd.DataFrame(
            {"feature": feature_columns, "importance": rf_model.feature_importances_}
        ).sort_values("importance", ascending=False)

        # Generar predicciones futuras
        ml_predictions = self._generate_ml_future_predictions(
            rf_model, clean_data, feature_columns, horizon_weeks
        )

        # Guardar modelo y predicciones
        self.models["ml"] = rf_model
        self.predictions["ml"] = ml_predictions

        print(
            f"✅ ML completado - R²: {self.metrics['ml']['r2']:.3f}, MAE: {self.metrics['ml']['mae']:.2f} MWh"
        )
        return ml_predictions

    def predict_with_prophet(self, horizon_weeks=None):
        """Predicciones usando Prophet (si está disponible)"""
        if not PROPHET_AVAILABLE:
            print("⚠️ Prophet no disponible. Ejecuta: pip install prophet")
            return None

        if horizon_weeks is None:
            horizon_weeks = PredictionConfig.PREDICTION_CONFIG["default_horizon_weeks"]

        print(f"\n🔮 Ejecutando predicciones Prophet ({horizon_weeks} semanas)...")

        prophet_results = []
        groups = self.df.groupby(["departamento", "tecnologia"])

        for (dept, tech), group_data in groups:
            if len(group_data) < PredictionConfig.PREDICTION_CONFIG["min_data_points"]:
                print(f"   ⚠️ Saltando {dept}-{tech}: datos insuficientes")
                continue

            try:
                # Preparar datos para Prophet
                prophet_df = pd.DataFrame(
                    {"ds": group_data["fecha"], "y": group_data["produccion_mwh"]}
                )

                # Configurar modelo Prophet
                model = Prophet(**PredictionConfig.PROPHET_CONFIG)

                # Suprimir logs de Prophet
                import logging

                logging.getLogger("prophet").setLevel(logging.WARNING)

                model.fit(prophet_df)

                # Crear fechas futuras
                future_dates = model.make_future_dataframe(
                    periods=horizon_weeks, freq="W"
                )

                # Hacer predicciones
                forecast = model.predict(future_dates)

                # Extraer solo predicciones futuras
                future_forecast = forecast.tail(horizon_weeks).copy()
                future_forecast["departamento"] = dept
                future_forecast["tecnologia"] = tech

                prophet_results.append(
                    future_forecast[
                        [
                            "ds",
                            "yhat",
                            "yhat_lower",
                            "yhat_upper",
                            "departamento",
                            "tecnologia",
                        ]
                    ]
                )

                print(f"   ✅ {dept}-{tech}: modelo entrenado")

            except Exception as e:
                print(f"   ❌ Error en {dept}-{tech}: {str(e)}")
                continue

        if prophet_results:
            self.predictions["prophet"] = pd.concat(prophet_results, ignore_index=True)
            # Asegurar que no hay valores negativos
            self.predictions["prophet"]["yhat"] = np.maximum(
                self.predictions["prophet"]["yhat"], 0
            )
            print(f"✅ Prophet completado: {len(prophet_results)} modelos entrenados")

        return self.predictions.get("prophet")

    def _generate_ml_future_predictions(
        self, model, data, feature_columns, horizon_weeks
    ):
        """Generar predicciones futuras para ML"""
        predictions = []

        # Obtener la última fecha y crear fechas futuras
        last_date = data["fecha"].max()
        future_dates = pd.date_range(
            start=last_date + timedelta(weeks=1), periods=horizon_weeks, freq="W"
        )

        # Generar predicciones para cada combinación departamento-tecnología
        for (dept, tech), group in data.groupby(["departamento", "tecnologia"]):
            if len(group) < 3:
                continue

            # Usar la última observación como base
            last_observation = group.iloc[-1].copy()

            for future_date in future_dates:
                # Crear características para la fecha futura
                new_features = last_observation[feature_columns].copy()

                # Actualizar características temporales
                new_features["mes"] = future_date.month
                new_features["trimestre"] = future_date.quarter
                new_features["semana_año"] = future_date.isocalendar().week
                new_features["mes_sin"] = np.sin(2 * np.pi * future_date.month / 12)
                new_features["mes_cos"] = np.cos(2 * np.pi * future_date.month / 12)
                new_features["semana_sin"] = np.sin(
                    2 * np.pi * future_date.isocalendar().week / 52
                )
                new_features["semana_cos"] = np.cos(
                    2 * np.pi * future_date.isocalendar().week / 52
                )

                # Hacer predicción
                prediction_value = model.predict([new_features])[0]

                # Agregar a resultados
                predictions.append(
                    {
                        "fecha": future_date,
                        "departamento": dept,
                        "tecnologia": tech,
                        "prediccion_mwh": max(
                            0, prediction_value
                        ),  # Evitar valores negativos
                    }
                )

        return pd.DataFrame(predictions)

    def generate_prediction_insights(self):
        """Generar insights de las predicciones"""
        insights = {}

        print("\n" + "=" * 60)
        print("💡 INSIGHTS DE PREDICCIONES")
        print("=" * 60)

        # Insights de ML
        if "ml" in self.predictions:
            ml_pred = self.predictions["ml"]

            # Por tecnología
            tech_ml = (
                ml_pred.groupby("tecnologia")["prediccion_mwh"]
                .agg(["mean", "sum"])
                .round(2)
            )
            print(f"\n🤖 PREDICCIONES ML POR TECNOLOGÍA:")
            for tech in tech_ml.index:
                mean_val = tech_ml.loc[tech, "mean"]
                total_val = tech_ml.loc[tech, "sum"]
                print(
                    f"   • {tech}: {mean_val} MWh promedio, {total_val} MWh total proyectado"
                )

            # Por departamento
            dept_ml = (
                ml_pred.groupby("departamento")["prediccion_mwh"]
                .agg(["mean", "sum"])
                .round(2)
            )
            top_dept_future = dept_ml["sum"].idxmax()
            insights["departamento_lider_futuro"] = top_dept_future

            print(f"\n🗺️ PREDICCIONES ML POR DEPARTAMENTO:")
            for dept in dept_ml.index:
                total = dept_ml.loc[dept, "sum"]
                print(f"   • {dept}: {total} MWh total proyectado")

            print(f"\n🏆 Departamento líder proyectado: {top_dept_future}")

        # Insights de Prophet
        if "prophet" in self.predictions:
            prophet_pred = self.predictions["prophet"]

            tech_prophet = (
                prophet_pred.groupby("tecnologia")["yhat"].agg(["mean", "sum"]).round(2)
            )
            print(f"\n🔮 PREDICCIONES PROPHET POR TECNOLOGÍA:")
            for tech in tech_prophet.index:
                mean_val = tech_prophet.loc[tech, "mean"]
                total_val = tech_prophet.loc[tech, "sum"]
                print(
                    f"   • {tech}: {mean_val} MWh promedio, {total_val} MWh total proyectado"
                )

        # Métricas del modelo
        if "ml" in self.metrics:
            print(f"\n📊 CALIDAD DEL MODELO ML:")
            print(f"   • Precisión R²: {self.metrics['ml']['r2']:.3f}")
            print(f"   • Error Promedio: {self.metrics['ml']['mae']:.2f} MWh")
            print(f"   • Error Porcentual: {self.metrics['ml']['mape']:.1f}%")

        # Top características importantes
        if "ml" in self.feature_importance:
            print(f"\n📈 TOP 5 FACTORES MÁS PREDICTIVOS:")
            top_features = self.feature_importance["ml"].head(5)
            for _, row in top_features.iterrows():
                print(f"   • {row['feature']}: {row['importance']:.3f}")

        return insights

    def export_predictions(self, export_dir):
        """Exportar predicciones y métricas"""
        import os

        os.makedirs(export_dir, exist_ok=True)

        exported_files = []

        # Exportar predicciones ML
        if "ml" in self.predictions:
            ml_path = os.path.join(export_dir, "predicciones_ml.csv")
            self.predictions["ml"].to_csv(ml_path, index=False)
            exported_files.append(ml_path)

        # Exportar predicciones Prophet
        if "prophet" in self.predictions:
            prophet_path = os.path.join(export_dir, "predicciones_prophet.csv")
            self.predictions["prophet"].to_csv(prophet_path, index=False)
            exported_files.append(prophet_path)

        # Exportar métricas
        if self.metrics:
            metrics_df = pd.DataFrame(self.metrics).T
            metrics_path = os.path.join(export_dir, "metricas_modelos.csv")
            metrics_df.to_csv(metrics_path, index=True)
            exported_files.append(metrics_path)

        # Exportar feature importance
        if "ml" in self.feature_importance:
            importance_path = os.path.join(
                export_dir, "importancia_caracteristicas.csv"
            )
            self.feature_importance["ml"].to_csv(importance_path, index=False)
            exported_files.append(importance_path)

        print(f"\n💾 Predicciones exportadas en {len(exported_files)} archivos:")
        for file_path in exported_files:
            print(f"   • {os.path.basename(file_path)}")

        return exported_files
