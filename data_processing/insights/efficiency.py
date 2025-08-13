def generate_efficiency_insights(df):
    insights = {}
    dept_efficiency = {}

    for dept in df["departamento"].unique():
        dept_data = df[df["departamento"] == dept]
        avg_production = dept_data["produccion_mwh"].mean()
        consistency = 1 - (dept_data["produccion_mwh"].std() / avg_production) if avg_production > 0 else 0

        dept_efficiency[dept] = {
            "produccion_promedio": avg_production,
            "consistencia": consistency,
            "total_registros": len(dept_data)
        }

        print(f"   • {dept}: {avg_production:.2f} MWh promedio (Consistencia: {consistency:.2f})")

    insights["eficiencia_departamental"] = dept_efficiency
    most_efficient = max(dept_efficiency.items(), key=lambda x: x[1]["produccion_promedio"])
    insights["departamento_mas_eficiente"] = {
        "nombre": most_efficient[0],
        "eficiencia": most_efficient[1]["produccion_promedio"]
    }
    return insights
