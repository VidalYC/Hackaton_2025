def analyze_technology_trends(self):
    print(f"\n⚡ TENDENCIAS TECNOLÓGICAS:")
    print("-" * 30)

    historical_tech = self.df_historical.groupby("tecnologia")["produccion_mwh"].sum()
    historical_leader = historical_tech.idxmax()
    print(f"   📊 Tecnología líder histórica: {historical_leader}")

    if "ml" in self.predictor.predictions:
        future_tech = (
            self.predictor.predictions["ml"]
            .groupby("tecnologia")["prediccion_mwh"]
            .sum()
        )
        future_leader = future_tech.idxmax()
        print(f"   🤖 Tecnología líder proyectada: {future_leader}")

        print(f"\n   📈 Crecimiento proyectado por tecnología:")
        for tech in historical_tech.index:
            if tech in future_tech.index:
                hist_avg = historical_tech[tech] / len(
                    self.df_historical[self.df_historical["tecnologia"] == tech]
                )
                fut_avg = future_tech[tech] / len(
                    self.predictor.predictions["ml"][
                        self.predictor.predictions["ml"]["tecnologia"] == tech
                    ]
                )
                growth = ((fut_avg - hist_avg) / hist_avg) * 100
                print(f"      • {tech}: {growth:+.1f}%")

        self.prediction_insights["tecnologia_lider_futuro"] = future_leader
        self.prediction_insights["tecnologia_consistente"] = future_leader == historical_leader
