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
        "dept_encoded", "tech_encoded", "mes", "trimestre", "semana_año",
        "mes_sin", "mes_cos", "semana_sin", "semana_cos",
        "produccion_lag_1", "produccion_lag_2", "produccion_ma_4"
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

    rf_config = {k: v for k, v in PredictionConfig.ML_CONFIG.items() if k != "test_size"}
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

    ml_predictions = _generate_ml_future_predictions(self, rf_model, clean_data, feature_columns, horizon_weeks)

    self.models["ml"] = rf_model
    self.predictions["ml"] = ml_predictions

    print(f"✅ ML completado - R²: {self.metrics['ml']['r2']:.3f}")
    return ml_predictions

def _generate_ml_future_predictions(self, model, data, feature_columns, horizon_weeks):
    predictions = []
    last_date = data["fecha"].max()
    future_dates = pd.date_range(start=last_date + timedelta(weeks=1), periods=horizon_weeks, freq="W")

    for (dept, tech), group in data.groupby(["departamento", "tecnologia"]):
        if len(group) < 3:
            continue

        last_obs = group.iloc[-1].copy()
        for future_date in future_dates:
            new_features = last_obs[feature_columns].copy()
            new_features["mes"] = future_date.month
            new_features["trimestre"] = future_date.quarter
            new_features["semana_año"] = future_date.isocalendar().week
            new_features["mes_sin"] = np.sin(2 * np.pi * future_date.month / 12)
            new_features["mes_cos"] = np.cos(2 * np.pi * future_date.month / 12)
            new_features["semana_sin"] = np.sin(2 * np.pi * future_date.isocalendar().week / 52)
            new_features["semana_cos"] = np.cos(2 * np.pi * future_date.isocalendar().week / 52)

            pred_value = model.predict([new_features])[0]
            predictions.append({
                "fecha": future_date,
                "departamento": dept,
                "tecnologia": tech,
                "prediccion_mwh": max(0, pred_value)
            })

    return pd.DataFrame(predictions)
