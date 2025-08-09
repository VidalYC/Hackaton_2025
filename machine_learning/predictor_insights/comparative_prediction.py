import pandas as pd

def generate_comparative_analysis(self):
    print("\n" + "=" * 60)
    print("📈 ANÁLISIS COMPARATIVO: HISTÓRICO vs FUTURO")
    print("=" * 60)

    historical_avg = self.df_historical["produccion_mwh"].mean()
    historical_total = self.df_historical["produccion_mwh"].sum()

    print(f"📊 DATOS HISTÓRICOS:")
    print(f"   • Promedio semanal: {historical_avg:.2f} MWh")
    print(f"   • Total histórico: {historical_total:.2f} MWh")

    if "ml" in self.predictor.predictions:
        ml_pred = self.predictor.predictions["ml"]
        future_avg = ml_pred["prediccion_mwh"].mean()
        future_total = ml_pred["prediccion_mwh"].sum()
        change_avg = ((future_avg - historical_avg) / historical_avg) * 100

        print(f"\n🤖 PREDICCIONES ML:")
        print(f"   • Promedio semanal futuro: {future_avg:.2f} MWh")
        print(f"   • Total proyectado: {future_total:.2f} MWh")
        print(f"   • Cambio en promedio: {change_avg:+.1f}%")
        self.prediction_insights["cambio_promedio_ml"] = change_avg

    if "prophet" in self.predictor.predictions:
        prophet_pred = self.predictor.predictions["prophet"]
        prophet_avg = prophet_pred["yhat"].mean()
        prophet_total = prophet_pred["yhat"].sum()
        change_prophet = ((prophet_avg - historical_avg) / historical_avg) * 100

        print(f"\n🔮 PREDICCIONES PROPHET:")
        print(f"   • Promedio semanal futuro: {prophet_avg:.2f} MWh")
        print(f"   • Total proyectado: {prophet_total:.2f} MWh")
        print(f"   • Cambio en promedio: {change_prophet:+.1f}%")
        self.prediction_insights["cambio_promedio_prophet"] = change_prophet
