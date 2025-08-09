class InsightsGenerator:
    def __init__(self, df, insights):
        self.df = df
        self.insights = insights

    def generate_summary(self):
        print("\n" + "=" * 50)
        print("💡 INSIGHTS CLAVE PARA LA PRESENTACIÓN")
        print("=" * 50)

        lider = self.insights.get("departamento_lider", {})
        print(
            f"1. {lider.get('nombre')} lidera con {lider.get('porcentaje')}% de la producción"
        )
        dominante = self.insights.get("tecnologia_dominante", {}).get("lider")
        print(f"2. Tecnología dominante: {dominante}")
        mejor = self.insights.get("estacionalidad", {}).get("mejor_mes")
        print(f"3. Mejor mes: {mejor}")
