import os
import json
from datetime import datetime

def export_comparative_report(self, export_dir):
    os.makedirs(export_dir, exist_ok=True)

    complete_report = {
        "fecha_analisis": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "insights_historicos": self.eda_insights,
        "insights_predicciones": self.prediction_insights,
        "metricas_modelo": self.predictor.metrics,
        "recomendaciones": self.prediction_insights.get("recomendaciones", []),
    }

    json_path = os.path.join(export_dir, "reporte_completo.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(complete_report, f, indent=2, ensure_ascii=False, default=str)

    txt_path = os.path.join(export_dir, "resumen_ejecutivo.txt")
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write("RESUMEN EJECUTIVO - ANÁLISIS DE ENERGÍA RENOVABLE\n")
        f.write("=" * 55 + "\n\n")
        f.write(f"Fecha de análisis: {complete_report['fecha_analisis']}\n\n")
        f.write("SITUACIÓN HISTÓRICA:\n")
        f.write("-" * 20 + "\n")
        if "departamento_lider" in self.eda_insights:
            leader = self.eda_insights["departamento_lider"]
            f.write(f"• Departamento líder: {leader.get('nombre')} ({leader.get('porcentaje')}%)\n")
        if "tecnologia_dominante" in self.eda_insights:
            tech = self.eda_insights["tecnologia_dominante"]
            f.write(f"• Tecnología dominante: {tech.get('lider')}\n")
        f.write(f"\nPROYECCIONES FUTURAS:\n")
        f.write("-" * 20 + "\n")
        if "nuevo_lider" in self.prediction_insights:
            f.write(f"• Líder proyectado: {self.prediction_insights['nuevo_lider']}\n")
        if "cambio_promedio_ml" in self.prediction_insights:
            change = self.prediction_insights["cambio_promedio_ml"]
            f.write(f"• Cambio proyectado: {change:+.1f}%\n")
        f.write(f"\nRECOMENDACIONES:\n")
        f.write("-" * 15 + "\n")
        for i, rec in enumerate(complete_report["recomendaciones"], 1):
            f.write(f"{i}. {rec}\n")

    print(f"\n📄 Reporte exportado:")
    print(f"   • JSON completo: {os.path.basename(json_path)}")
    print(f"   • Resumen ejecutivo: {os.path.basename(txt_path)}")
    return [json_path, txt_path]
