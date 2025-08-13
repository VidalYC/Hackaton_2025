def analyze_departments(df):
    insights = {}
    dept_stats = df.groupby("departamento")["produccion_mwh"].agg(['sum', 'mean']).round(2)

    top_dept = dept_stats['sum'].idxmax()
    insights["departamento_lider"] = {
        "nombre": top_dept,
        "produccion_total": float(dept_stats.loc[top_dept, 'sum']),
        "porcentaje": float(dept_stats.loc[top_dept, 'sum'] / df["produccion_mwh"].sum() * 100)
    }

    print("\n" + "=" * 50)
    print("🗺️  ANÁLISIS DETALLADO POR DEPARTAMENTOS")
    print("=" * 50)
    print(f"Líder: {top_dept} con {insights['departamento_lider']['porcentaje']:.1f}% del total")

    return insights
