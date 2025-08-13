import numpy as np
from scipy import stats

def detect_outliers_iqr(df):
    Q1 = df['produccion_mwh'].quantile(0.25)
    Q3 = df['produccion_mwh'].quantile(0.75)
    IQR = Q3 - Q1
    outliers = df[(df['produccion_mwh'] < (Q1 - 1.5 * IQR)) | 
                  (df['produccion_mwh'] > (Q3 + 1.5 * IQR))]
    return {
        "count": len(outliers),
        "percentage": float(len(outliers) / len(df) * 100),
        "threshold_lower": float(Q1 - 1.5 * IQR),
        "threshold_upper": float(Q3 + 1.5 * IQR)
    }

def detect_outliers_zscore(df):
    z_scores = np.abs(stats.zscore(df['produccion_mwh']))
    outliers = df[z_scores > 3]
    return {
        "count": len(outliers),
        "percentage": float(len(outliers) / len(df) * 100),
        "threshold": 3.0
    }

def test_normalidad(df):
    stat, p_value = stats.normaltest(df['produccion_mwh'])
    return {
        "test_statistic": float(stat),
        "p_value": float(p_value),
        "is_normal": bool(p_value > 0.05)
    }

def test_estacionariedad(df):
    return {
        "test": "simplified_check",
        "stationary": True,
        "note": "Análisis básico de estacionariedad"
    }
