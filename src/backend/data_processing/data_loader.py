import pandas as pd
import os

class DataLoader:
    def __init__(self, data_path):
        self.data_path = data_path
        self.df = None

    def load_data(self):
        """Cargar y preparar los datos iniciales"""
        try:
            self.df = pd.read_csv(self.data_path)
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
