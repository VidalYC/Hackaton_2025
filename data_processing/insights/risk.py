def generate_risk_insights(df):
    insights = {}
    dept_production = df.groupby("departamento")["produccion_mwh"].sum()
    total_production = dept_production.sum()

    concentration_risk = []
    for dept, production in dept_production.items():
        percentage = (production / total_production) * 100
        if percentage > 40:
            concentration_risk.append({
                "departamento": dept,
                "porcentaje": percentage,
                "nivel_riesgo": "alto" if percentage > 60 else "medio"
            })

    insights["riesgo_concentracion"] = concentration_risk

    tech_production = df.groupby("tecnologia")["produccion_mwh"].sum()
    tech_diversity = len(tech_production)
    insights["diversificacion_tecnologica"] = {
        "tecnologias_activas": tech_diversity,
        "distribucion": {tech: float((prod / total_production) * 100) for tech, prod in tech_production.items()},
        "nivel_diversificacion": "alta" if tech_diversity >= 3 else "media" if tech_diversity == 2 else "baja"
    }

    return insights
