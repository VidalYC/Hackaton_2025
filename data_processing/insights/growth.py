import pandas as pd

def generate_growth_insights(df):
    insights = {}
    if len(df) > 50:
        df["fecha"] = pd.to_datetime(df["fecha"])
        df_sorted = df.sort_values("fecha")
        mid_point = len(df_sorted) // 2

        first_period = df_sorted.iloc[:mid_point]
        second_period = df_sorted.iloc[mid_point:]

        first_avg = first_period["produccion_mwh"].mean()
        second_avg = second_period["produccion_mwh"].mean()

        if first_avg > 0:
            growth_rate = ((second_avg - first_avg) / first_avg) * 100
            insights["crecimiento_historico"] = {
                "primer_periodo_promedio": first_avg,
                "segundo_periodo_promedio": second_avg,
                "tasa_crecimiento": growth_rate,
                "tendencia": "positiva" if growth_rate > 0 else "negativa"
            }

            print(f"   • Crecimiento histórico: {growth_rate:+.1f}%")
    return insights
