import os
from data_loader import DataLoader
from eda import EnergyEDA
from insights import InsightsGenerator
from exporter import DataExporter

if __name__ == "__main__":
    
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # carpeta src
    ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))  # sube a Hackaton_2025

    DATA_PATH = os.path.join(ROOT_DIR, "data", "raw", "dataset_energia_completo_2050_registros.csv")
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
