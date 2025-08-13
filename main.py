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


def main():
    """Flujo principal: EDA + Predicciones integradas"""

    print("🚀 ANÁLISIS COMPLETO DE ENERGÍA RENOVABLE")
    print("=" * 50)
    print("📊 EDA + 🔮 Predicciones + 💡 Insights Comparativos")
    print("=" * 50)

    # ========================================
    # CONFIGURACIÓN DE RUTAS
    # ========================================
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    ROOT_DIR = BASE_DIR  # No subir carpetas
    DATA_PATH = os.path.join(
        ROOT_DIR, "data", "raw", "dataset_energia_completo_2050_registros.csv"
    )

    EXPORT_DIR = os.path.join(ROOT_DIR, "data", "processed")
    PREDICTIONS_DIR = os.path.join(
        ROOT_DIR, "data", "predictions"
    )  # 👈 Ahora será data/predictions directamente

    # ========================================
    # FASE 1: EDA TRADICIONAL
    # ========================================
    print("\n📊 FASE 1: ANÁLISIS EXPLORATORIO DE DATOS")
    print("-" * 45)

    loader = DataLoader(DATA_PATH)
    if not loader.load_data():
        print("❌ Error: No se pudieron cargar los datos")
        return

    # EDA existente
    eda = EnergyEDA(loader.df)
    eda.basic_info()
    eda.analyze_temporal_patterns()  # Crea mes, trimestre, etc.
    eda.analyze_departments()
    eda.analyze_technologies()
    eda.cross_analysis()


    # insights existentes
    insights_gen = InsightsGenerator(loader.df, eda.insights)
    insights_gen.generate_summary()
    
    # Generar insights comprehensive para el reporte
    comprehensive_insights = insights_gen.get_comprehensive_insights()
    eda.insights.update(comprehensive_insights)

    loader.df = eda.df


    # ========================================
    # FASE 2: PREDICCIONES AVANZADAS
    # ========================================
    print("\n🔮 FASE 2: PREDICCIONES AVANZADAS")
    print("-" * 35)

    try:
        # Inicializar sistema de predicciones
        print("🔧 Inicializando sistema de predicciones...")
        predictor = EnergyPredictor(loader.df)

        # Ejecutar predicciones ML (siempre disponible)
        print("\n🤖 Ejecutando predicciones con Machine Learning...")
        ml_predictions = predictor.predict_with_ml(horizon_weeks=24)

        # Ejecutar predicciones Prophet (si está disponible)
        print("\n🔮 Ejecutando predicciones con Prophet...")
        prophet_predictions = predictor.predict_with_prophet(horizon_weeks=24)

        # Generar insights de predicciones
        prediction_insights = predictor.generate_prediction_insights()

        # ========================================
        # FASE 3: ANÁLISIS COMPARATIVO
        # ========================================
        print("\n📈 FASE 3: ANÁLISIS COMPARATIVO HISTÓRICO vs FUTURO")
        print("-" * 55)

        # Crear generador de insights comparativos
        comparative_insights = PredictionInsightsGenerator(
            loader.df, 
            predictor, 
            eda.insights  # Ahora contiene los insights comprehensive
        )

        # Ejecutar análisis comparativo
        comparative_insights.generate_comparative_analysis()
        comparative_insights.analyze_leadership_consistency()
        comparative_insights.analyze_technology_trends()

        # Generar recomendaciones
        recommendations = comparative_insights.generate_recommendations()

        # Resumen ejecutivo integrado
        executive_summary = comparative_insights.generate_executive_summary()

        # ========================================
        # FASE 4: EXPORTACIÓN COMPLETA
        # ========================================
        print("\n💾 FASE 4: EXPORTACIÓN DE RESULTADOS")
        print("-" * 40)

        # Tu exportación tradicional (sin cambios)
        print("📁 Exportando datos EDA tradicionales...")
        exporter = DataExporter(loader.df, EXPORT_DIR)
        exporter.export_processed_data()

        # Nueva exportación de predicciones
        print("📁 Exportando predicciones y análisis...")
        prediction_files = predictor.export_predictions(PREDICTIONS_DIR)

        # Exportar reporte comparativo completo
        print("📁 Exportando reporte ejecutivo...")
        report_files = comparative_insights.export_comparative_report(PREDICTIONS_DIR)

        # ========================================
        # RESUMEN FINAL
        # ========================================
        print("\n🎉 ¡ANÁLISIS COMPLETO FINALIZADO!")
        print("=" * 35)
        print(f"📂 Resultados EDA: {EXPORT_DIR}")
        print(f"📂 Resultados Predicciones: {PREDICTIONS_DIR}")
        print(
            f"📊 Total archivos generados: {len(prediction_files) + len(report_files) + 2}"
        )

        if ml_predictions is not None:
            print(f"🤖 Predicciones ML: {len(ml_predictions)} registros")
        if prophet_predictions is not None:
            print(f"🔮 Predicciones Prophet: {len(prophet_predictions)} registros")

        print(f"💡 Recomendaciones generadas: {len(recommendations)}")

        # Ejemplo de comparación
        df_historico = loader.df
        comparacion = df_historico.merge(
            ml_predictions,
            on=["fecha", "departamento", "tecnologia"],
            how="left",  # o "inner" si solo se quiere coincidencias
        )

        return {
            "eda": eda,
            "predictor": predictor,
            "insights": comparative_insights,
            "files": prediction_files + report_files,
        }

    except Exception as e:
        print(f"⚠️ Error en predicciones: {e}")
        traceback.print_exc()
        print("📊 Continuando solo con EDA tradicional...")

        # Fallback: solo tu EDA original
        exporter = DataExporter(loader.df, EXPORT_DIR)
        exporter.export_processed_data()

        print("✅ EDA completado (sin predicciones)")
        return {"eda": eda, "predictor": None}


if __name__ == "__main__":
    main()
