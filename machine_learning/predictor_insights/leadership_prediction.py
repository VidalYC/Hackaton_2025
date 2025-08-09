def analyze_leadership_consistency(self):
    print(f"\n🏆 ANÁLISIS DE LIDERAZGO:")
    print("-" * 25)

    historical_leader = self.eda_insights.get("departamento_lider", {}).get("nombre", "N/A")
    historical_percentage = self.eda_insights.get("departamento_lider", {}).get("porcentaje", 0)

    print(f"   📊 Líder histórico: {historical_leader} ({historical_percentage}%)")

    if "ml" in self.predictor.predictions:
        future_leader_ml = (
            self.predictor.predictions["ml"]
            .groupby("departamento")["prediccion_mwh"]
            .sum()
            .idxmax()
        )

        total_future = self.predictor.predictions["ml"]["prediccion_mwh"].sum()
        leader_future_total = self.predictor.predictions["ml"][
            self.predictor.predictions["ml"]["departamento"] == future_leader_ml
        ]["prediccion_mwh"].sum()
        future_percentage = (leader_future_total / total_future) * 100

        print(f"   🤖 Líder proyectado (ML): {future_leader_ml} ({future_percentage:.1f}%)")

        consistency = future_leader_ml == historical_leader
        consistency_text = "✅ Consistente" if consistency else "⚠️ Cambio de liderazgo"
        print(f"   {consistency_text}")

        self.prediction_insights["liderazgo_consistente"] = consistency
        self.prediction_insights["nuevo_lider"] = future_leader_ml
