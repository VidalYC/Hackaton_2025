import os
import pandas as pd

def export_predictions(self, export_dir):
    os.makedirs(export_dir, exist_ok=True)
    exported_files = []

    if "ml" in self.predictions:
        ml_path = os.path.join(export_dir, "predicciones_ml.csv")
        self.predictions["ml"].to_csv(ml_path, index=False)
        exported_files.append(ml_path)

    if "prophet" in self.predictions:
        prophet_path = os.path.join(export_dir, "predicciones_prophet.csv")
        self.predictions["prophet"].to_csv(prophet_path, index=False)
        exported_files.append(prophet_path)

    if self.metrics:
        metrics_df = pd.DataFrame(self.metrics).T
        metrics_path = os.path.join(export_dir, "metricas_modelos.csv")
        metrics_df.to_csv(metrics_path, index=True)
        exported_files.append(metrics_path)

    if "ml" in self.feature_importance:
        importance_path = os.path.join(export_dir, "importancia_caracteristicas.csv")
        self.feature_importance["ml"].to_csv(importance_path, index=False)
        exported_files.append(importance_path)

    print(f"\n💾 Archivos exportados: {len(exported_files)}")
    return exported_files
