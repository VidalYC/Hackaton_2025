# src/backend/data_processing/config.py


class PredictionConfig:
    """Configuración para el sistema de predicciones"""

    # Configuración de Machine Learning
    ML_CONFIG = {
        "n_estimators": 100,
        "max_depth": 8,
        "min_samples_split": 3,
        "random_state": 42,
        "test_size": 0.2,
    }

    # Configuración de predicciones
    PREDICTION_CONFIG = {
        "default_horizon_weeks": 20,
        "min_data_points": 8,
        "lags": [1, 2, 4],
        "rolling_windows": [4, 8],
    }

    # Configuración de Prophet (si está disponible)
    PROPHET_CONFIG = {
        "yearly_seasonality": True,
        "weekly_seasonality": False,
        "daily_seasonality": False,
        "seasonality_mode": "multiplicative",
    }

    @classmethod
    def validate_dataframe(cls, df):
        """Validar que el DataFrame tenga las columnas necesarias"""
        required_columns = ["departamento", "tecnologia", "produccion_mwh", "fecha"]
        missing_columns = [col for col in required_columns if col not in df.columns]

        if missing_columns:
            raise ValueError(f"Columnas faltantes en el DataFrame: {missing_columns}")

        return True
