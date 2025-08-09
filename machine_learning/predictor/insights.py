def generate_prediction_insights(self):
    insights = {}
    print("\n" + "=" * 60)
    print("💡 INSIGHTS DE PREDICCIONES")
    print("=" * 60)

    if "ml" in self.predictions:
        ml_pred = self.predictions["ml"]
        tech_ml = ml_pred.groupby("tecnologia")["prediccion_mwh"].agg(["mean", "sum"]).round(2)
        for tech in tech_ml.index:
            print(f"   • {tech}: {tech_ml.loc[tech, 'mean']} MWh promedio")

        dept_ml = ml_pred.groupby("departamento")["prediccion_mwh"].agg(["mean", "sum"]).round(2)
        top_dept = dept_ml["sum"].idxmax()
        insights["departamento_lider_futuro"] = top_dept
        print(f"🏆 Departamento líder proyectado: {top_dept}")

    if "prophet" in self.predictions:
        prophet_pred = self.predictions["prophet"]
        tech_prophet = prophet_pred.groupby("tecnologia")["yhat"].agg(["mean", "sum"]).round(2)
        for tech in tech_prophet.index:
            print(f"   • {tech}: {tech_prophet.loc[tech, 'mean']} MWh promedio")

    return insights
