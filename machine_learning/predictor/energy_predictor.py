from .data_preparation import prepare_data
from .ml_model import predict_with_ml
from .prophet_model import predict_with_prophet
from .insights import generate_prediction_insights
from .export_utils import export_predictions
from data_processing.config.config import PredictionConfig


class EnergyPredictor:
    """Sistema de predicciones de energía integrado y modularizado"""

    def __init__(self, df):
        PredictionConfig.validate_dataframe(df)
        self.df = prepare_data(df)
        self.models = {}
        self.predictions = {}
        self.metrics = {}
        self.feature_importance = {}

    def predict_with_ml(self, horizon_weeks=None):
        return predict_with_ml(self, horizon_weeks)

    def predict_with_prophet(self, horizon_weeks=None):
        return predict_with_prophet(self, horizon_weeks)

    def generate_prediction_insights(self):
        return generate_prediction_insights(self)

    def export_predictions(self, export_dir):
        return export_predictions(self, export_dir)
