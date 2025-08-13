import pandas as pd
from scipy import stats
from .utils import detect_outliers_iqr, detect_outliers_zscore, test_normalidad, test_estacionariedad

def basic_info(df):
    insights = {}
    basic_stats = {
        "filas_total": len(df),
        "columnas_total": len(df.columns),
        "periodo_inicio": str(df['fecha'].min()),
        "periodo_fin": str(df['fecha'].max()),
        "dias_totales": (pd.to_datetime(df['fecha'].max()) - pd.to_datetime(df['fecha'].min())).days,
        "memoria_uso_mb": round(df.memory_usage(deep=True).sum() / 1024**2, 2),
        "duplicados": df.duplicated().sum(),
        "valores_nulos_total": df.isnull().sum().sum(),
        "porcentaje_completitud": round((1 - df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100, 2)
    }

    produccion_stats = {
        "produccion_total_mwh": float(df['produccion_mwh'].sum()),
        "produccion_promedio_mwh": float(df['produccion_mwh'].mean()),
        "produccion_mediana_mwh": float(df['produccion_mwh'].median()),
        "produccion_std_mwh": float(df['produccion_mwh'].std()),
        "produccion_min_mwh": float(df['produccion_mwh'].min()),
        "produccion_max_mwh": float(df['produccion_mwh'].max()),
        "produccion_percentil_25": float(df['produccion_mwh'].quantile(0.25)),
        "produccion_percentil_75": float(df['produccion_mwh'].quantile(0.75)),
        "coeficiente_variacion": float(df['produccion_mwh'].std() / df['produccion_mwh'].mean()),
        "asimetria": float(stats.skew(df['produccion_mwh'])),
        "curtosis": float(stats.kurtosis(df['produccion_mwh']))
    }

    distribucion_analysis = {
        "outliers_iqr": detect_outliers_iqr(df),
        "outliers_zscore": detect_outliers_zscore(df),
        "normalidad_test": test_normalidad(df),
        "estacionariedad": test_estacionariedad(df)
    }

    insights["informacion_basica"] = basic_stats
    insights["estadisticas_produccion"] = produccion_stats
    insights["analisis_distribucion"] = distribucion_analysis

    print("\n" + "=" * 50)
    print("📋 INFORMACIÓN BÁSICA DEL DATASET")
    print("=" * 50)
    print(f"🔢 Filas: {basic_stats['filas_total']}")
    print(f"🔢 Columnas: {basic_stats['columnas_total']}")
    print(f"📅 Periodo: {basic_stats['periodo_inicio']} a {basic_stats['periodo_fin']}")
    print(f"📊 Completitud: {basic_stats['porcentaje_completitud']}%")

    return insights
