import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from data_processing.config.config import PredictionConfig


def prepare_data(df):
    """Preparar y enriquecer datos para predicción"""
    print("\n🔄 Preparando datos para predicción...")

    df = df.copy()
    df["fecha"] = pd.to_datetime(df["fecha"])
    df = df.sort_values(["departamento", "tecnologia", "fecha"]).reset_index(drop=True)

    # Características temporales
    df["año"] = df["fecha"].dt.year
    df["mes"] = df["fecha"].dt.month
    df["trimestre"] = df["fecha"].dt.quarter
    df["semana_año"] = df["fecha"].dt.isocalendar().week
    df["dia_año"] = df["fecha"].dt.dayofyear

    # Variables cíclicas
    df["mes_sin"] = np.sin(2 * np.pi * df["mes"] / 12)
    df["mes_cos"] = np.cos(2 * np.pi * df["mes"] / 12)
    df["semana_sin"] = np.sin(2 * np.pi * df["semana_año"] / 52)
    df["semana_cos"] = np.cos(2 * np.pi * df["semana_año"] / 52)

    # Encoding
    le_dept = LabelEncoder()
    le_tech = LabelEncoder()
    df["dept_encoded"] = le_dept.fit_transform(df["departamento"])
    df["tech_encoded"] = le_tech.fit_transform(df["tecnologia"])

    # Lags
    df = df.sort_values(["departamento", "tecnologia", "fecha"])
    for lag in PredictionConfig.PREDICTION_CONFIG["lags"]:
        df[f"produccion_lag_{lag}"] = df.groupby(
            ["departamento", "tecnologia"]
        )["produccion_mwh"].shift(lag)

    # Medias móviles
    for window in [4, 8]:
        df[f"produccion_ma_{window}"] = (
            df.groupby(["departamento", "tecnologia"])["produccion_mwh"]
            .transform(lambda x: x.rolling(window, min_periods=1).mean())
        )

    print(f"✅ Datos preparados: {df.shape}")
    return df
