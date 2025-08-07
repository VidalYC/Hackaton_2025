import pandas as pd
import os
import sys

# Agregar el directorio raíz al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class EnergyDataAnalyzer:
    def __init__(
        self,
        data_path="C:\\Users\\yorie\\Downloads\\Hackaton\\data\\raw\\dataset_energia_completo_2050_registros.csv",
    ):
        """
        Inicializar el analizador de datos energéticos

        Args:
            data_path (str): Ruta al archivo CSV de datos
        """
        self.data_path = data_path
        self.df = None
        self.insights = {}

    def load_data(self):
        """Cargar y preparar los datos iniciales"""
        try:
            # Primero cargar los datos
            self.df = pd.read_csv(self.data_path)

            # Luego normalizar las columnas (DESPUÉS de cargar)
            self.df.columns = (
                self.df.columns.str.normalize("NFKD")
                .str.encode("ascii", errors="ignore")
                .str.decode("utf-8")
            )

            print("✅ Datos cargados exitosamente")
            print(f"📊 Dimensiones: {self.df.shape}")
            return True

        except FileNotFoundError:
            print(f"❌ Error: No se encontró el archivo {self.data_path}")
            return False
        except Exception as e:
            print(f"❌ Error al cargar datos: {e}")
            return False

    def basic_info(self):
        """Información básica del dataset"""
        if self.df is None:
            print("❌ Primero debes cargar los datos")
            return

        print("\n" + "=" * 50)
        print("📋 INFORMACIÓN BÁSICA DEL DATASET")
        print("=" * 50)

        print(f"🔢 Filas: {len(self.df)}")
        print(f"🔢 Columnas: {len(self.df.columns)}")
        print(f"📅 Periodo: {self.df['fecha'].min()} a " f"{self.df['fecha'].max()}")

        print("\n📊 Tipos de datos:")
        print(self.df.dtypes)

        print("\n📊 Primeras 5 filas:")
        print(self.df.head())

        print("\n📊 Valores nulos:")
        print(self.df.isnull().sum())

    def analyze_departments(self):
        """Análisis por departamentos"""
        if self.df is None:
            return

        print("\n" + "=" * 50)
        print("🗺️  ANÁLISIS POR DEPARTAMENTOS")
        print("=" * 50)

        # produccion total por departamento
        dept_production = (
            self.df.groupby("departamento")["produccion_mwh"]
            .agg(["sum", "mean", "count"])
            .round(2)
        )
        dept_production.columns = ["Total_MWh", "Promedio_MWh", "Num_Registros"]

        print("📊 produccion por departamento:")
        print(dept_production.sort_values("Total_MWh", ascending=False))

        # Departamento líder
        top_dept = dept_production.index[0]
        top_production = dept_production.loc[top_dept, "Total_MWh"]

        self.insights["departamento_lider"] = {
            "nombre": top_dept,
            "produccion_total": top_production,
            "porcentaje": round(
                top_production / self.df["produccion_mwh"].sum() * 100, 1
            ),
        }

        print(f"\n🏆 Departamento líder: {top_dept}")
        porcentaje = self.insights["departamento_lider"]["porcentaje"]
        print(f"💡 Produce el {porcentaje}% del total")

    def analyze_technologies(self):
        """Análisis por tecnologias"""
        if self.df is None:
            return

        print("\n" + "=" * 50)
        print("⚡ ANÁLISIS POR tecnologiaS")
        print("=" * 50)

        # produccion por tecnologia
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

        print("📊 produccion por tecnologia:")
        print(tech_production)

        # Análisis de eficiencia
        for tech in self.df["tecnologia"].unique():
            tech_data = self.df[self.df["tecnologia"] == tech]["produccion_mwh"]

            print(f"\n🔋 {tech.upper()}:")
            print(f"   Min: {tech_data.min()} MWh")
            print(f"   Max: {tech_data.max()} MWh")
            print(f"   Variabilidad: {tech_data.std():.2f} MWh")

        # tecnologia dominante
        total_solar = self.df[self.df["tecnologia"] == "Solar"]["produccion_mwh"].sum()
        total_eolica = self.df[self.df["tecnologia"] == "Eólica"][
            "produccion_mwh"
        ].sum()

        self.insights["tecnologia_dominante"] = {
            "solar": total_solar,
            "eolica": total_eolica,
            "lider": "Solar" if total_solar > total_eolica else "Eólica",
        }

    def analyze_temporal_patterns(self):
        """Análisis de patrones temporales"""
        if self.df is None:
            return

        print("\n" + "=" * 50)
        print("📅 ANÁLISIS TEMPORAL")
        print("=" * 50)

        # Convertir fecha a datetime
        self.df["fecha"] = pd.to_datetime(self.df["fecha"])
        self.df["mes"] = self.df["fecha"].dt.month
        self.df["trimestre"] = self.df["fecha"].dt.quarter

        # produccion por mes
        monthly_production = (
            self.df.groupby("mes")["produccion_mwh"]
            .agg(["sum", "mean", "count"])
            .round(2)
        )

        print("📊 produccion mensual:")
        meses = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
        ]

        for i, mes in enumerate(meses, 1):
            if i in monthly_production.index:
                total = monthly_production.loc[i, "sum"]
                print(f"   {mes}: {total:,} MWh")

        # Mejor y peor mes
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

        mejor_mes_nombre = meses[best_month - 1]
        peor_mes_nombre = meses[worst_month - 1]
        mejor_produccion = monthly_production.loc[best_month, "sum"]
        peor_produccion = monthly_production.loc[worst_month, "sum"]

        print(f"\n🌟 Mejor mes: {mejor_mes_nombre} " f"({mejor_produccion:,} MWh)")
        print(f"📉 Peor mes: {peor_mes_nombre} " f"({peor_produccion:,} MWh)")

    def cross_analysis(self):
        """Análisis cruzado departamento-tecnologia"""
        if self.df is None:
            return

        print("\n" + "=" * 50)
        print("🔄 ANÁLISIS CRUZADO")
        print("=" * 50)

        # Matriz departamento-tecnologia
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

        print("📊 produccion por Departamento y tecnologia (MWh):")
        print(cross_matrix)

        # Especialización por departamento
        print("\n🎯 Especialización por departamento:")
        for dept in cross_matrix.index:
            solar = (
                cross_matrix.loc[dept, "Solar"]
                if "Solar" in cross_matrix.columns
                else 0
            )
            eolica = (
                cross_matrix.loc[dept, "Eólica"]
                if "Eólica" in cross_matrix.columns
                else 0
            )
            total_dept = solar + eolica

            if total_dept > 0:
                if solar > eolica:
                    porcentaje = solar / total_dept * 100
                    spec = f"Solar ({porcentaje:.1f}%)"
                else:
                    porcentaje = eolica / total_dept * 100
                    spec = f"Eólica ({porcentaje:.1f}%)"
                print(f"   {dept}: {spec}")

    def generate_insights_summary(self):
        """Generar resumen de insights clave"""
        if not self.insights:
            return

        print("\n" + "=" * 50)
        print("💡 INSIGHTS CLAVE PARA LA PRESENTACIÓN")
        print("=" * 50)

        print("🏆 Principales hallazgos:")
        lider = self.insights["departamento_lider"]
        print(
            f"1. {lider['nombre']} lidera con {lider['porcentaje']}% "
            "de la produccion"
        )
        dominante = self.insights["tecnologia_dominante"]["lider"]
        print(f"2. tecnologia dominante: {dominante}")
        mejor = self.insights["estacionalidad"]["mejor_mes"]
        print(f"3. Estacionalidad: Mejor produccion en mes {mejor}")
        diferencia = self.insights["estacionalidad"]["diferencia"]
        print(f"4. Variación estacional: {diferencia:,.0f} MWh " "de diferencia")

        total_production = self.df["produccion_mwh"].sum()
        avg_production = self.df["produccion_mwh"].mean()

        print("\n📊 KPIs principales:")
        print(f"• produccion total 2024: {total_production:,} MWh")
        print(f"• produccion promedio semanal: {avg_production:,.0f} MWh")
        departamentos = self.df["departamento"].nunique()
        print(f"• Número de departamentos activos: {departamentos}")
        tecnologias = self.df["tecnologia"].nunique()
        print(f"• tecnologias implementadas: {tecnologias}")

    def export_processed_data(self):
        """Exportar datos procesados para Looker Studio"""
        if self.df is None:
            return

        # Crear directorio si no existe
        processed_dir = "C:\\Users\\yorie\\Downloads\\Hackaton\\data\\processed"
        os.makedirs(processed_dir, exist_ok=True)

        # Dataset principal limpio
        export_df = self.df.copy()
        export_df["fecha"] = pd.to_datetime(export_df["fecha"])
        export_df["año"] = export_df["fecha"].dt.year
        export_df["mes"] = export_df["fecha"].dt.month
        export_df["trimestre"] = export_df["fecha"].dt.quarter
        export_df["semana"] = export_df["fecha"].dt.isocalendar().week

        # Guardar dataset principal
        export_path = os.path.join(processed_dir, "energia_produccion_clean.csv")
        export_df.to_csv(export_path, index=False)

        # Dataset agregado mensual
        monthly_agg = (
            self.df.groupby(["departamento", "tecnologia", "mes"])
            .agg({"produccion_mwh": ["sum", "mean", "count"]})
            .reset_index()
        )
        monthly_agg.columns = [
            "departamento",
            "tecnologia",
            "mes",
            "total_mwh",
            "promedio_mwh",
            "num_registros",
        ]

        monthly_path = os.path.join(processed_dir, "energia_mensual_agregado.csv")
        monthly_agg.to_csv(monthly_path, index=False)

        print("\n💾 Datos exportados:")
        print(f"   - Dataset principal: {export_path}")
        print(f"   - Agregado mensual: {monthly_path}")

    def run_full_analysis(self):
        """Ejecutar análisis completo"""
        print("🚀 INICIANDO ANÁLISIS EXPLORATORIO DE DATOS")
        print("🔋 Energías Renovables - Región 6")
        print("=" * 60)

        if not self.load_data():
            return False

        self.basic_info()
        self.analyze_departments()
        self.analyze_technologies()
        self.analyze_temporal_patterns()
        self.cross_analysis()
        self.generate_insights_summary()
        self.export_processed_data()

        print("\n✅ Análisis completado exitosamente!")
        return True


if __name__ == "__main__":
    # Ejecutar análisis
    analyzer = EnergyDataAnalyzer()
    analyzer.run_full_analysis()
