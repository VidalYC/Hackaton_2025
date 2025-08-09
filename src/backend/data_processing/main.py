# src/backend/data_processing/main.py - VERSIÓN ACTUALIZADA CON PREDICCIONES

import os
from data_loader import DataLoader
from eda import EnergyEDA
from insights import InsightsGenerator
from exporter import DataExporter
import traceback  # 👈 Nueva importación para mostrar tracebacks

# 👈 NUEVAS IMPORTACIONES PARA PREDICCIONES
from predictor import EnergyPredictor
from prediction_insights import PredictionInsightsGenerator


def main():
    """Flujo principal: EDA + Predicciones integradas"""

    print("🚀 ANÁLISIS COMPLETO DE ENERGÍA RENOVABLE")
    print("=" * 50)
    print("📊 EDA + 🔮 Predicciones + 💡 Insights Comparativos")
    print("=" * 50)

    # ========================================
    # CONFIGURACIÓN DE RUTAS (sin cambios)
    # ========================================
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "..", ".."))
    DATA_PATH = os.path.join(
        ROOT_DIR, "data", "raw", "dataset_energia_completo_2050_registros.csv"
    )
    EXPORT_DIR = os.path.join(ROOT_DIR, "data", "processed")
    PREDICTIONS_DIR = os.path.join(
        ROOT_DIR, "data", "predictions"
    )  # 👈 Ahora será data/predictions directamente

    # ========================================
    # FASE 1: EDA TRADICIONAL (sin cambios)
    # ========================================
    print("\n📊 FASE 1: ANÁLISIS EXPLORATORIO DE DATOS")
    print("-" * 45)

    loader = DataLoader(DATA_PATH)
    if not loader.load_data():
        print("❌ Error: No se pudieron cargar los datos")
        return

    # Tu EDA existente (exactamente igual)
    eda = EnergyEDA(loader.df)
    eda.basic_info()
    eda.analyze_departments()
    eda.analyze_technologies()
    eda.analyze_temporal_patterns()
    eda.cross_analysis()

    # Tus insights existentes (exactamente igual)
    insights_gen = InsightsGenerator(loader.df, eda.insights)
    insights_gen.generate_summary()

    # ========================================
    # FASE 2: PREDICCIONES AVANZADAS (NUEVA)
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
        # FASE 3: ANÁLISIS COMPARATIVO (NUEVA)
        # ========================================
        print("\n📈 FASE 3: ANÁLISIS COMPARATIVO HISTÓRICO vs FUTURO")
        print("-" * 55)

        # Crear generador de insights comparativos
        comparative_insights = PredictionInsightsGenerator(
            loader.df, predictor, eda.insights
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
        # FASE 4: EXPORTACIÓN COMPLETA (AMPLIADA)
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

        # Ejemplo de comparación (nuevo)
        df_historico = loader.df
        comparacion = df_historico.merge(
            ml_predictions,
            on=["fecha", "departamento", "tecnologia"],
            how="left"  # o "inner" si solo quieres coincidencias
        )

        return {
            "eda": eda,
            "predictor": predictor,
            "insights": comparative_insights,
            "files": prediction_files + report_files,
        }

    except Exception as e:
        print(f"⚠️ Error en predicciones: {e}")
        traceback.print_exc()  # 👈 Agrega esta línea para ver el traceback completo
        print("📊 Continuando solo con EDA tradicional...")

        # Fallback: solo tu EDA original
        exporter = DataExporter(loader.df, EXPORT_DIR)
        exporter.export_processed_data()

        print("✅ EDA completado (sin predicciones)")
        return {"eda": eda, "predictor": None}


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
    main()

    # Opciones adicionales para ejecutar por separado:
    # run_eda_only()              # Solo EDA original
    # run_predictions_only()      # Solo predicciones
    # quick_test_with_sample_data()  # Test con dataset pequeño
