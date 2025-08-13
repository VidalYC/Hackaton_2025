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


def quick_test_with_sample_data():
    """Test rápido con el dataset pequeño"""
    print("⚡ TEST RÁPIDO CON DATASET PEQUEÑO")
    print("=" * 35)

    try:
        # Intentar con dataset pequeño en la misma carpeta
        sample_path = "ada_6_dataset_1_energia.csv"
        loader = DataLoader(sample_path)

        if loader.load_data():
            print("📊 Ejecutando EDA básico...")
            eda = EnergyEDA(loader.df)
            eda.basic_info()
            eda.analyze_departments()

            print("\n🔮 Ejecutando predicciones...")
            predictor = EnergyPredictor(loader.df)
            predictor.predict_with_ml(horizon_weeks=8)
            predictor.generate_prediction_insights()

            print("✅ Test completado exitosamente")
            return {"eda": eda, "predictor": predictor}

    except Exception as e:
        print(f"❌ Error en test: {e}")
        print("💡 Asegúrate de que 'ada_6_dataset_1_energia.csv' esté disponible")
        return None


if __name__ == "__main__":
    # Ejecutar análisis completo
    # main()

    # Opciones adicionales para ejecutar por separado:
    # run_eda_only()              # Solo EDA original
    # run_predictions_only()      # Solo predicciones
    quick_test_with_sample_data()  # Test con dataset pequeño
