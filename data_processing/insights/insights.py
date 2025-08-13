from .efficiency import generate_efficiency_insights
from .growth import generate_growth_insights
from .risk import generate_risk_insights
from .correlation import generate_correlation_insights
from .utils import get_month_name

class InsightsGenerator:
    def __init__(self, df, insights):
        self.df = df.copy()
        self.insights = insights

    def generate_summary(self):
        print("\n" + "=" * 60)
        print("💡 INSIGHTS DETALLADOS PARA EL REPORTE")
        print("=" * 60)

        lider = self.insights.get("departamento_lider", {})
        print(f"🏆 LIDERAZGO DEPARTAMENTAL:")
        print(f"   • {lider.get('nombre')} domina con {lider.get('porcentaje')}% de la producción")
        print(f"   • Producción total: {lider.get('produccion_total', 0):,.2f} MWh")

        dominante = self.insights.get("tecnologia_dominante", {})
        print(f"\n⚡ DOMINANCIA TECNOLÓGICA:")
        print(f"   • {dominante.get('lider')} es la tecnología líder")
        print(f"   • Producción total: {dominante.get('produccion_total', 0):,.2f} MWh")

        estacional = self.insights.get("estacionalidad", {})
        print(f"\n📅 PATRONES ESTACIONALES:")
        print(f"   • Mejor mes: {get_month_name(estacional.get('mejor_mes', 1))}")
        print(f"   • Peor mes: {get_month_name(estacional.get('peor_mes', 1))}")

        # Generar insights detallados
        self.insights.update(generate_efficiency_insights(self.df))
        self.insights.update(generate_growth_insights(self.df))
        self.insights.update(generate_risk_insights(self.df))
        self.insights.update(generate_correlation_insights(self.df))

    def get_comprehensive_insights(self):
        return {
            "liderazgo": self.insights.get("departamento_lider", {}),
            "tecnologia": self.insights.get("tecnologia_dominante", {}),
            "estacionalidad": self.insights.get("estacionalidad", {}),
            "eficiencia": self.insights.get("eficiencia_departamental", {}),
            "crecimiento": self.insights.get("crecimiento_historico", {}),
            "riesgos": self.insights.get("riesgo_concentracion", []),
            "diversificacion": self.insights.get("diversificacion_tecnologica", {}),
            "correlaciones": self.insights.get("correlaciones_tecnologicas", {}),
            "complementariedad": self.insights.get("complementariedad", {})
        }
