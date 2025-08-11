import numpy as np
import pandas as pd
from datetime import timedelta
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from data_processing.config.config import PredictionConfig


def predict_with_ml(self, horizon_weeks=None):
    if horizon_weeks is None:
        horizon_weeks = PredictionConfig.PREDICTION_CONFIG["default_horizon_weeks"]

    print(f"\n🤖 Ejecutando predicciones ML ({horizon_weeks} semanas)...")

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

    clean_data = self.df.dropna(subset=feature_columns + ["produccion_mwh"])
    if len(clean_data) < PredictionConfig.PREDICTION_CONFIG["min_data_points"]:
        print("❌ Datos insuficientes.")
        return None

    X = clean_data[feature_columns]
    y = clean_data["produccion_mwh"]

    split_idx = int(len(clean_data) * (1 - PredictionConfig.ML_CONFIG["test_size"]))
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

    rf_config = {
        k: v for k, v in PredictionConfig.ML_CONFIG.items() if k != "test_size"
    }
    rf_model = RandomForestRegressor(**rf_config)

    print("   🔧 Entrenando modelo Random Forest...")
    rf_model.fit(X_train, y_train)

    y_pred = rf_model.predict(X_test)
    self.metrics["ml"] = {
        "mae": mean_absolute_error(y_test, y_pred),
        "rmse": np.sqrt(mean_squared_error(y_test, y_pred)),
        "r2": r2_score(y_test, y_pred),
        "mape": np.mean(np.abs((y_test - y_pred) / y_test)) * 100,
    }

    self.feature_importance["ml"] = pd.DataFrame(
        {"feature": feature_columns, "importance": rf_model.feature_importances_}
    ).sort_values("importance", ascending=False)

    ml_predictions = _generate_ml_future_predictions(
        self, rf_model, clean_data, feature_columns, horizon_weeks
    )

    self.models["ml"] = rf_model
    self.predictions["ml"] = ml_predictions

    print(f"✅ ML completado - R²: {self.metrics['ml']['r2']:.3f}")
    return ml_predictions


def _generate_ml_future_predictions(self, model, data, feature_columns, horizon_weeks):
    predictions = []
    last_date = data["fecha"].max()

    # pasar horizonte en semanas -> días
    horizon_days = int(horizon_weeks) * 7
    future_dates = pd.date_range(
        start=last_date + pd.Timedelta(days=1), periods=horizon_days, freq="D"
    )

    # agrupar por departamento+tecnologia
    for (dept, tech), group in data.groupby(["departamento", "tecnologia"]):
        if len(group) < 3:
            continue

        group = group.sort_values("fecha")
        last_obs = group.iloc[-1].copy()

        # historia para lags: tomar últimas 4 observaciones reales (o menos si no hay)
        history = list(group["produccion_mwh"].tail(4).tolist())

        for future_date in future_dates:
            # empezamos desde los features estáticos de la última observación
            new_row = last_obs[feature_columns].copy()

            # actualizar fechas/estacionales
            new_row["mes"] = future_date.month
            new_row["trimestre"] = future_date.quarter
            # .isocalendar().week es compatible con pandas.Timestamp en versiones recientes
            new_row["semana_año"] = future_date.isocalendar().week
            new_row["mes_sin"] = np.sin(2 * np.pi * new_row["mes"] / 12)
            new_row["mes_cos"] = np.cos(2 * np.pi * new_row["mes"] / 12)
            new_row["semana_sin"] = np.sin(2 * np.pi * new_row["semana_año"] / 52)
            new_row["semana_cos"] = np.cos(2 * np.pi * new_row["semana_año"] / 52)

            # actualizar lags a partir de 'history' (recursivo)
            new_row["produccion_lag_1"] = history[-1] if len(history) >= 1 else 0.0
            new_row["produccion_lag_2"] = history[-2] if len(history) >= 2 else 0.0
            new_row["produccion_ma_4"] = (
                float(np.mean(history[-4:])) if len(history) >= 1 else 0.0
            )

            # crear DataFrame con el orden correcto de columnas que usó el modelo
            X_row = pd.DataFrame([new_row])[feature_columns]

            pred_value = model.predict(X_row)[0]
            pred_value = max(0.0, pred_value)

            predictions.append(
                {
                    "fecha": future_date,
                    "departamento": dept,
                    "tecnologia": tech,
                    "prediccion_mwh": pred_value,
                }
            )

            # actualizar historial con la predicción (para next-step recursion)
            history.append(pred_value)
            # opcional: mantener solo las últimas N entradas
            if len(history) > 20:
                history = history[-20:]

    return pd.DataFrame(predictions)
