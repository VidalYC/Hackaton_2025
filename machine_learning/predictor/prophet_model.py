import numpy as np
import pandas as pd
from data_processing.config.config import PredictionConfig

try:
    from prophet import Prophet
    PROPHET_AVAILABLE = True
except ImportError:
    PROPHET_AVAILABLE = False

def predict_with_prophet(self, horizon_weeks=None):
    if not PROPHET_AVAILABLE:
        print("⚠️ Prophet no disponible.")
        return None

    if horizon_weeks is None:
        horizon_weeks = PredictionConfig.PREDICTION_CONFIG["default_horizon_weeks"]

    print(f"\n🔮 Ejecutando predicciones Prophet ({horizon_weeks} semanas)...")
    prophet_results = []

    for (dept, tech), group_data in self.df.groupby(["departamento", "tecnologia"]):
        if len(group_data) < PredictionConfig.PREDICTION_CONFIG["min_data_points"]:
            continue

        prophet_df = pd.DataFrame({"ds": group_data["fecha"], "y": group_data["produccion_mwh"]})
        model = Prophet(**PredictionConfig.PROPHET_CONFIG)
        model.fit(prophet_df)

        future_dates = model.make_future_dataframe(periods=horizon_weeks, freq="W")
        forecast = model.predict(future_dates)
        future_forecast = forecast.tail(horizon_weeks).copy()
        future_forecast["departamento"] = dept
        future_forecast["tecnologia"] = tech

        prophet_results.append(future_forecast[["ds", "yhat", "yhat_lower", "yhat_upper", "departamento", "tecnologia"]])

    if prophet_results:
        self.predictions["prophet"] = pd.concat(prophet_results, ignore_index=True)
        self.predictions["prophet"]["yhat"] = np.maximum(self.predictions["prophet"]["yhat"], 0)

    return self.predictions.get("prophet")
