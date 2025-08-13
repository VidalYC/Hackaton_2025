import os
import traceback  # Para mostrar tracebacks
from data_processing.import_export_Data.data_loader import DataLoader
from data_processing.eda.eda import EnergyEDA
from data_processing.insights.insights import InsightsGenerator
from data_processing.import_export_Data.exporter import DataExporter
from machine_learning.predictor.energy_predictor import EnergyPredictor
from machine_learning.predictor_insights.prediction_insights import (
    PredictionInsightsGenerator,
)


def run_predictions_only():
    """Ejecutar solo predicciones (para testing rápido)"""
    print("🔮 EJECUTANDO SOLO PREDICCIONES (MODO TESTING)")
    print("=" * 45)

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))
    DATA_PATH = os.path.join(
        ROOT_DIR, "data", "raw", "dataset_energia_completo_2050_registros.csv"
    )

    try:
        loader = DataLoader(DATA_PATH)
        if loader.load_data():
            predictor = EnergyPredictor(loader.df)
            predictor.predict_with_ml(horizon_weeks=12)
            predictor.generate_prediction_insights()

            print("✅ Predicciones completadas (modo testing)")
            return predictor
    except Exception as e:
        print(f"❌ Error: {e}")
        return None


if __name__ == "__main__":
    # Ejecutar análisis completo
    # main()

    # Opciones adicionales para ejecutar por separado:
    # run_eda_only()              # Solo EDA original
    run_predictions_only()  # Solo predicciones
    # quick_test_with_sample_data()  # Test con dataset pequeño
