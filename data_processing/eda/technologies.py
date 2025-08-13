def analyze_technologies(df):
    insights = {}
    tech_stats = df.groupby("tecnologia")["produccion_mwh"].agg(['sum', 'mean']).round(2)

    lider_tech = tech_stats['sum'].idxmax()
    insights["tecnologia_dominante"] = {
        "lider": lider_tech,
        "produccion_total": float(tech_stats.loc[lider_tech, 'sum']),
        "participacion": float(tech_stats.loc[lider_tech, 'sum'] / df["produccion_mwh"].sum() * 100)
    }

    print("\n" + "=" * 50)
    print("⚡ ANÁLISIS TECNOLÓGICO DETALLADO")
    print("=" * 50)
    print(f"Tecnología líder: {lider_tech} ({insights['tecnologia_dominante']['participacion']:.1f}%)")

    return insights
