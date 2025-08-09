def generate_executive_summary(self):
    print("\n" + "=" * 70)
    print("📋 RESUMEN EJECUTIVO: ENERGÍA RENOVABLE")
    print("=" * 70)

    print(f"\n📊 SITUACIÓN ACTUAL:")
    historical_leader = self.eda_insights.get("departamento_lider", {})
    if historical_leader:
        print(f"   • {historical_leader.get('nombre')} lidera con {historical_leader.get('porcentaje')}% de producción")

    tech_leader = self.eda_insights.get("tecnologia_dominante", {}).get("lider", "N/A")
    print(f"   • Tecnología dominante: {tech_leader}")

    best_month = self.eda_insights.get("estacionalidad", {}).get("mejor_mes", "N/A")
    print(f"   • Mejor mes histórico: {best_month}")

    print(f"\n🔮 PROYECCIONES FUTURAS:")
    if "nuevo_lider" in self.prediction_insights:
        future_leader = self.prediction_insights["nuevo_lider"]
        consistency = "mantendrá" if self.prediction_insights.get("liderazgo_consistente") else "cambiará a"
        print(f"   • Liderazgo {consistency}: {future_leader}")

    if "tecnologia_lider_futuro" in self.prediction_insights:
        tech_future = self.prediction_insights["tecnologia_lider_futuro"]
        print(f"   • Tecnología líder proyectada: {tech_future}")

    if "cambio_promedio_ml" in self.prediction_insights:
        change = self.prediction_insights["cambio_promedio_ml"]
        trend = "crecimiento" if change > 0 else "decrecimiento"
        print(f"   • Tendencia general: {trend} del {abs(change):.1f}%")

    if "ml" in self.predictor.metrics:
        r2_score = self.predictor.metrics["ml"]["r2"]
        confidence = "Alta" if r2_score > 0.8 else "Media" if r2_score > 0.6 else "Baja"
        print(f"\n🎯 CONFIABILIDAD DE PREDICCIONES:")
        print(f"   • Precisión del modelo: {confidence} (R² = {r2_score:.3f})")

    return self.prediction_insights
