import pandas as pd

class EnergyEDA:
    def __init__(self, df):
        self.df = df
        self.insights = {}

    def basic_info(self):
        print("\n" + "=" * 50)
        print("📋 INFORMACIÓN BÁSICA DEL DATASET")
        print("=" * 50)
        print(f"🔢 Filas: {len(self.df)}")
        print(f"🔢 Columnas: {len(self.df.columns)}")
        print(f"📅 Periodo: {self.df['fecha'].min()} a {self.df['fecha'].max()}")
        print("\n📊 Tipos de datos:")
        print(self.df.dtypes)
        print("\n📊 Primeras 5 filas:")
        print(self.df.head())
        print("\n📊 Valores nulos:")
        print(self.df.isnull().sum())

    def analyze_departments(self):
        dept_production = (
            self.df.groupby("departamento")["produccion_mwh"]
            .agg(["sum", "mean", "count"])
            .round(2)
        )
        dept_production.columns = ["Total_MWh", "Promedio_MWh", "Num_Registros"]
        print("\n" + "=" * 50)
        print("🗺️  ANÁLISIS POR DEPARTAMENTOS")
        print("=" * 50)
        print(dept_production.sort_values("Total_MWh", ascending=False))

        top_dept = dept_production.index[0]
        top_production = dept_production.loc[top_dept, "Total_MWh"]

        self.insights["departamento_lider"] = {
            "nombre": top_dept,
            "produccion_total": top_production,
            "porcentaje": round(
                top_production / self.df["produccion_mwh"].sum() * 100, 1
            ),
        }

    def analyze_technologies(self):
        tech_production = (
            self.df.groupby("tecnologia")["produccion_mwh"]
            .agg(["sum", "mean", "count", "std"])
            .round(2)
        )
        tech_production.columns = [
            "Total_MWh",
            "Promedio_MWh",
            "Num_Registros",
            "Desv_Std",
        ]
        print("\n" + "=" * 50)
        print("⚡ ANÁLISIS POR TECNOLOGÍAS")
        print("=" * 50)
        print(tech_production)

        total_solar = self.df[self.df["tecnologia"] == "Solar"]["produccion_mwh"].sum()
        total_eolica = self.df[self.df["tecnologia"] == "Eólica"]["produccion_mwh"].sum()

        self.insights["tecnologia_dominante"] = {
            "solar": total_solar,
            "eolica": total_eolica,
            "lider": "Solar" if total_solar > total_eolica else "Eólica",
        }

    def analyze_temporal_patterns(self):
        self.df["fecha"] = pd.to_datetime(self.df["fecha"])
        self.df["mes"] = self.df["fecha"].dt.month
        monthly_production = (
            self.df.groupby("mes")["produccion_mwh"]
            .agg(["sum", "mean", "count"])
            .round(2)
        )

        best_month = monthly_production["sum"].idxmax()
        worst_month = monthly_production["sum"].idxmin()

        self.insights["estacionalidad"] = {
            "mejor_mes": best_month,
            "peor_mes": worst_month,
            "diferencia": (
                monthly_production.loc[best_month, "sum"]
                - monthly_production.loc[worst_month, "sum"]
            ),
        }

    def cross_analysis(self):
        cross_matrix = (
            pd.crosstab(
                self.df["departamento"],
                self.df["tecnologia"],
                values=self.df["produccion_mwh"],
                aggfunc="sum",
            )
            .fillna(0)
            .round(0)
        )
        print("\n" + "=" * 50)
        print("🔄 ANÁLISIS CRUZADO")
        print("=" * 50)
        print(cross_matrix)
