import pandas as pd

def generate_correlation_insights(df):
    insights = {}
    cross_analysis = df.pivot_table(
        index="departamento",
        columns="tecnologia",
        values="produccion_mwh",
        aggfunc="sum"
    ).fillna(0)

    correlations = {}
    if cross_analysis.shape[1] > 1:
        for tech1 in cross_analysis.columns:
            for tech2 in cross_analysis.columns:
                if tech1 != tech2:
                    corr = cross_analysis[tech1].corr(cross_analysis[tech2])
                    if abs(corr) > 0.5:
                        correlations[f"{tech1}_vs_{tech2}"] = {
                            "correlacion": corr,
                            "tipo": "positiva" if corr > 0 else "negativa",
                            "fuerza": "fuerte" if abs(corr) > 0.7 else "moderada"
                        }

    insights["correlaciones_tecnologicas"] = correlations
    return insights
