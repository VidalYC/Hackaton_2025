import os
import pandas as pd

class DataExporter:
    def __init__(self, df, export_dir):
        self.df = df
        self.export_dir = export_dir

    def export_processed_data(self):
        os.makedirs(self.export_dir, exist_ok=True)
        export_df = self.df.copy()
        export_df["fecha"] = pd.to_datetime(export_df["fecha"])
        export_df["año"] = export_df["fecha"].dt.year
        export_df["mes"] = export_df["fecha"].dt.month
        export_df["trimestre"] = export_df["fecha"].dt.quarter
        export_df["semana"] = export_df["fecha"].dt.isocalendar().week

        export_path = os.path.join(self.export_dir, "energia_produccion_clean.csv")
        export_df.to_csv(export_path, index=False)

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
        monthly_path = os.path.join(self.export_dir, "energia_mensual_agregado.csv")
        monthly_agg.to_csv(monthly_path, index=False)

        print("\n💾 Datos exportados:")
        print(f"   - Dataset principal: {export_path}")
        print(f"   - Agregado mensual: {monthly_path}")
