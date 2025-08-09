def generate_recommendations(self):
    recommendations = []
    print(f"\n💡 RECOMENDACIONES ESTRATÉGICAS:")
    print("-" * 35)

    if self.prediction_insights.get("liderazgo_consistente", True):
        leader = self.eda_insights.get("departamento_lider", {}).get("nombre", "líder")
        recommendations.append(f"Mantener inversión en {leader} que conserva el liderazgo")
        print(f"   1. Mantener inversión en {leader} que conserva el liderazgo")
    else:
        new_leader = self.prediction_insights.get("nuevo_lider", "nuevo líder")
        recommendations.append(f"Considerar incrementar inversión en {new_leader} como nuevo líder emergente")
        print(f"   1. Considerar incrementar inversión en {new_leader} como nuevo líder emergente")

    if "tecnologia_lider_futuro" in self.prediction_insights:
        tech_leader = self.prediction_insights["tecnologia_lider_futuro"]
        recommendations.append(f"Priorizar desarrollo de tecnología {tech_leader}")
        print(f"   2. Priorizar desarrollo de tecnología {tech_leader}")

    if "cambio_promedio_ml" in self.prediction_insights:
        change = self.prediction_insights["cambio_promedio_ml"]
        if change > 5:
            recommendations.append("Preparar infraestructura para crecimiento proyectado")
            print(f"   3. Preparar infraestructura para crecimiento proyectado ({change:+.1f}%)")
        elif change < -5:
            recommendations.append("Revisar estrategias ante decrecimiento proyectado")
            print(f"   3. Revisar estrategias ante decrecimiento proyectado ({change:+.1f}%)")
        else:
            recommendations.append("Mantener estrategia actual con crecimiento estable")
            print(f"   3. Mantener estrategia actual con crecimiento estable ({change:+.1f}%)")

    recommendations.append("Implementar sistema de monitoreo predictivo continuo")
    print(f"   4. Implementar sistema de monitoreo predictivo continuo")

    self.prediction_insights["recomendaciones"] = recommendations
    return recommendations
