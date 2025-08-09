import os
import traceback  # Para mostrar tracebacks
from data_processing.import_export_Data.data_loader import DataLoader
from data_processing.eda.eda import EnergyEDA
from data_processing.eda.insights import InsightsGenerator
from data_processing.import_export_Data.exporter import DataExporter
from machine_learning.predictor.energy_predictor import EnergyPredictor
from machine_learning.predictor_insights.prediction_insights import (
    PredictionInsightsGenerator,
)

# ========================================
# FUNCIONES AUXILIARES NUEVAS
# ========================================


def run_eda_only():
    """Ejecutar solo EDA (tu funcionalidad original)"""
    print("📊 EJECUTANDO SOLO EDA (MODO ORIGINAL)")
    print("=" * 40)

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))
    DATA_PATH = os.path.join(
        ROOT_DIR, "data", "raw", "dataset_energia_completo_2050_registros.csv"
    )
    EXPORT_DIR = os.path.join(ROOT_DIR, "data", "processed")

    loader = DataLoader(DATA_PATH)
    if loader.load_data():
        eda = EnergyEDA(loader.df)
        eda.basic_info()
        eda.analyze_departments()
        eda.analyze_technologies()
        eda.analyze_temporal_patterns()
        eda.cross_analysis()

        insights_gen = InsightsGenerator(loader.df, eda.insights)
        insights_gen.generate_summary()

        exporter = DataExporter(loader.df, EXPORT_DIR)
        exporter.export_processed_data()

        return eda


if __name__ == "__main__":
    # Ejecutar análisis completo
    # main()

    # Opciones adicionales para ejecutar por separado:
    run_eda_only()  # Solo EDA original
    # run_predictions_only()      # Solo predicciones
    # quick_test_with_sample_data()  # Test con dataset pequeño
