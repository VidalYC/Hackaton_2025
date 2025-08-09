from .comparative_prediction import generate_comparative_analysis
from .leadership_prediction import analyze_leadership_consistency
from .technology_prediction import analyze_technology_trends
from .recommendations_prediction import generate_recommendations
from .summary_prediction import generate_executive_summary
from .export_prediction import export_comparative_report

class PredictionInsightsGenerator:
    """Generador de insights para predicciones, modularizado"""

    def __init__(self, df_historical, predictor, eda_insights):
        self.df_historical = df_historical
        self.predictor = predictor
        self.eda_insights = eda_insights
        self.prediction_insights = {}

    generate_comparative_analysis = generate_comparative_analysis
    analyze_leadership_consistency = analyze_leadership_consistency
    analyze_technology_trends = analyze_technology_trends
    generate_recommendations = generate_recommendations
    generate_executive_summary = generate_executive_summary
    export_comparative_report = export_comparative_report

