import pandas as pd

def analyze_temporal_patterns(df):
    insights = {}
    df["fecha"] = pd.to_datetime(df["fecha"])
    df["mes"] = df["fecha"].dt.month

    monthly_production = df.groupby("mes")["produccion_mwh"].sum()
    best_month = monthly_production.idxmax()
    worst_month = monthly_production.idxmin()

    insights["estacionalidad"] = {
        "mejor_mes": int(best_month),
        "peor_mes": int(worst_month)
    }

    print("\n" + "=" * 50)
    print("📅 ANÁLISIS TEMPORAL DETALLADO")
    print("=" * 50)
    print(f"Mejor mes: {best_month} | Peor mes: {worst_month}")

    return insights, df