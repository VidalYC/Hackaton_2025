# src/backend/data_processing/prediction_insights.py

import pandas as pd
import numpy as np
from datetime import datetime


class PredictionInsightsGenerator:
    """Generador de insights específico para predicciones, complementa InsightsGenerator"""

    def __init__(self, df_historical, predictor, eda_insights):
        self.df_historical = df_historical
        self.predictor = predictor
        self.eda_insights = eda_insights
        self.prediction_insights = {}

    def generate_comparative_analysis(self):
        """Comparar datos históricos vs predicciones"""
        print("\n" + "=" * 60)
        print("📈 ANÁLISIS COMPARATIVO: HISTÓRICO vs FUTURO")
        print("=" * 60)

        # Promedios históricos
        historical_avg = self.df_historical["produccion_mwh"].mean()
        historical_total = self.df_historical["produccion_mwh"].sum()

        print(f"📊 DATOS HISTÓRICOS:")
        print(f"   • Promedio semanal: {historical_avg:.2f} MWh")
        print(f"   • Total histórico: {historical_total:.2f} MWh")

        # Comparar con predicciones ML
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

        # Comparar con Prophet si está disponible
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

    def analyze_leadership_consistency(self):
        """Analizar consistencia de liderazgo entre departamentos"""
        print(f"\n🏆 ANÁLISIS DE LIDERAZGO:")
        print("-" * 25)

        # Líder histórico
        historical_leader = self.eda_insights.get("departamento_lider", {}).get(
            "nombre", "N/A"
        )
        historical_percentage = self.eda_insights.get("departamento_lider", {}).get(
            "porcentaje", 0
        )

        print(f"   📊 Líder histórico: {historical_leader} ({historical_percentage}%)")

        # Líder proyectado (ML)
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

            print(
                f"   🤖 Líder proyectado (ML): {future_leader_ml} ({future_percentage:.1f}%)"
            )

            # Evaluar consistencia
            consistency = future_leader_ml == historical_leader
            consistency_text = (
                "✅ Consistente" if consistency else "⚠️ Cambio de liderazgo"
            )
            print(f"   {consistency_text}")

            self.prediction_insights["liderazgo_consistente"] = consistency
            self.prediction_insights["nuevo_lider"] = future_leader_ml

    def analyze_technology_trends(self):
        """Analizar tendencias por tecnología"""
        print(f"\n⚡ TENDENCIAS TECNOLÓGICAS:")
        print("-" * 30)

        # Histórico por tecnología
        historical_tech = self.df_historical.groupby("tecnologia")[
            "produccion_mwh"
        ].sum()
        historical_leader = historical_tech.idxmax()

        print(f"   📊 Tecnología líder histórica: {historical_leader}")

        # Futuro por tecnología
        if "ml" in self.predictor.predictions:
            future_tech = (
                self.predictor.predictions["ml"]
                .groupby("tecnologia")["prediccion_mwh"]
                .sum()
            )
            future_leader = future_tech.idxmax()

            print(f"   🤖 Tecnología líder proyectada: {future_leader}")

            # Calcular crecimiento relativo
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
            self.prediction_insights["tecnologia_consistente"] = (
                future_leader == historical_leader
            )

    def generate_recommendations(self):
        """Generar recomendaciones basadas en los insights"""
        recommendations = []

        print(f"\n💡 RECOMENDACIONES ESTRATÉGICAS:")
        print("-" * 35)

        # Recomendación por liderazgo
        if self.prediction_insights.get("liderazgo_consistente", True):
            leader = self.eda_insights.get("departamento_lider", {}).get(
                "nombre", "líder"
            )
            recommendations.append(
                f"Mantener inversión en {leader} que conserva el liderazgo"
            )
            print(f"   1. Mantener inversión en {leader} que conserva el liderazgo")
        else:
            new_leader = self.prediction_insights.get("nuevo_lider", "nuevo líder")
            recommendations.append(
                f"Considerar incrementar inversión en {new_leader} como nuevo líder emergente"
            )
            print(
                f"   1. Considerar incrementar inversión en {new_leader} como nuevo líder emergente"
            )

        # Recomendación por tecnología
        if "tecnologia_lider_futuro" in self.prediction_insights:
            tech_leader = self.prediction_insights["tecnologia_lider_futuro"]
            recommendations.append(f"Priorizar desarrollo de tecnología {tech_leader}")
            print(f"   2. Priorizar desarrollo de tecnología {tech_leader}")

        # Recomendación por cambio promedio
        if "cambio_promedio_ml" in self.prediction_insights:
            change = self.prediction_insights["cambio_promedio_ml"]
            if change > 5:
                recommendations.append(
                    "Preparar infraestructura para crecimiento proyectado"
                )
                print(
                    f"   3. Preparar infraestructura para crecimiento proyectado ({change:+.1f}%)"
                )
            elif change < -5:
                recommendations.append(
                    "Revisar estrategias ante decrecimiento proyectado"
                )
                print(
                    f"   3. Revisar estrategias ante decrecimiento proyectado ({change:+.1f}%)"
                )
            else:
                recommendations.append(
                    "Mantener estrategia actual con crecimiento estable"
                )
                print(
                    f"   3. Mantener estrategia actual con crecimiento estable ({change:+.1f}%)"
                )

        # Recomendación general
        recommendations.append("Implementar sistema de monitoreo predictivo continuo")
        print(f"   4. Implementar sistema de monitoreo predictivo continuo")

        self.prediction_insights["recomendaciones"] = recommendations

        return recommendations

    def generate_executive_summary(self):
        """Generar resumen ejecutivo combinando EDA y predicciones"""
        print("\n" + "=" * 70)
        print("📋 RESUMEN EJECUTIVO: ENERGÍA RENOVABLE")
        print("=" * 70)

        # Información histórica clave
        print(f"\n📊 SITUACIÓN ACTUAL:")
        historical_leader = self.eda_insights.get("departamento_lider", {})
        if historical_leader:
            print(
                f"   • {historical_leader.get('nombre')} lidera con {historical_leader.get('porcentaje')}% de producción"
            )

        tech_leader = self.eda_insights.get("tecnologia_dominante", {}).get(
            "lider", "N/A"
        )
        print(f"   • Tecnología dominante: {tech_leader}")

        best_month = self.eda_insights.get("estacionalidad", {}).get("mejor_mes", "N/A")
        print(f"   • Mejor mes histórico: {best_month}")

        # Proyecciones futuras
        print(f"\n🔮 PROYECCIONES FUTURAS:")
        if "nuevo_lider" in self.prediction_insights:
            future_leader = self.prediction_insights["nuevo_lider"]
            consistency = (
                "mantendrá"
                if self.prediction_insights.get("liderazgo_consistente")
                else "cambiará a"
            )
            print(f"   • Liderazgo {consistency}: {future_leader}")

        if "tecnologia_lider_futuro" in self.prediction_insights:
            tech_future = self.prediction_insights["tecnologia_lider_futuro"]
            print(f"   • Tecnología líder proyectada: {tech_future}")

        if "cambio_promedio_ml" in self.prediction_insights:
            change = self.prediction_insights["cambio_promedio_ml"]
            trend = "crecimiento" if change > 0 else "decrecimiento"
            print(f"   • Tendencia general: {trend} del {abs(change):.1f}%")

        # Calidad de predicciones
        if "ml" in self.predictor.metrics:
            r2_score = self.predictor.metrics["ml"]["r2"]
            confidence = (
                "Alta" if r2_score > 0.8 else "Media" if r2_score > 0.6 else "Baja"
            )
            print(f"\n🎯 CONFIABILIDAD DE PREDICCIONES:")
            print(f"   • Precisión del modelo: {confidence} (R² = {r2_score:.3f})")

        return self.prediction_insights

    def export_comparative_report(self, export_dir):
        """Exportar reporte comparativo completo"""
        import os
        import json

        os.makedirs(export_dir, exist_ok=True)

        # Crear reporte completo
        complete_report = {
            "fecha_analisis": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "insights_historicos": self.eda_insights,
            "insights_predicciones": self.prediction_insights,
            "metricas_modelo": self.predictor.metrics,
            "recomendaciones": self.prediction_insights.get("recomendaciones", []),
        }

        # Exportar como JSON
        json_path = os.path.join(export_dir, "reporte_completo.json")
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(complete_report, f, indent=2, ensure_ascii=False, default=str)

        # Exportar como texto legible
        txt_path = os.path.join(export_dir, "resumen_ejecutivo.txt")
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write("RESUMEN EJECUTIVO - ANÁLISIS DE ENERGÍA RENOVABLE\n")
            f.write("=" * 55 + "\n\n")

            f.write(f"Fecha de análisis: {complete_report['fecha_analisis']}\n\n")

            # Sección histórica
            f.write("SITUACIÓN HISTÓRICA:\n")
            f.write("-" * 20 + "\n")
            if "departamento_lider" in self.eda_insights:
                leader = self.eda_insights["departamento_lider"]
                f.write(
                    f"• Departamento líder: {leader.get('nombre')} ({leader.get('porcentaje')}%)\n"
                )

            if "tecnologia_dominante" in self.eda_insights:
                tech = self.eda_insights["tecnologia_dominante"]
                f.write(f"• Tecnología dominante: {tech.get('lider')}\n")

            # Sección de predicciones
            f.write(f"\nPROYECCIONES FUTURAS:\n")
            f.write("-" * 20 + "\n")
            if "nuevo_lider" in self.prediction_insights:
                f.write(
                    f"• Líder proyectado: {self.prediction_insights['nuevo_lider']}\n"
                )

            if "cambio_promedio_ml" in self.prediction_insights:
                change = self.prediction_insights["cambio_promedio_ml"]
                f.write(f"• Cambio proyectado: {change:+.1f}%\n")

            # Recomendaciones
            f.write(f"\nRECOMENDACIONES:\n")
            f.write("-" * 15 + "\n")
            for i, rec in enumerate(complete_report["recomendaciones"], 1):
                f.write(f"{i}. {rec}\n")

        print(f"\n📄 Reporte exportado:")
        print(f"   • JSON completo: {os.path.basename(json_path)}")
        print(f"   • Resumen ejecutivo: {os.path.basename(txt_path)}")

        return [json_path, txt_path]
