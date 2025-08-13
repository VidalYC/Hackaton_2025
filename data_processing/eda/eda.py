import pandas as pd
from .basic_info import basic_info
from .departments import analyze_departments
from .technologies import analyze_technologies
from .temporal_patterns import analyze_temporal_patterns
from .cross_analysis import cross_analysis

class EnergyEDA:
    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()
        self.insights = {}

    def basic_info(self):
        self.insights.update(basic_info(self.df))

    def analyze_departments(self):
        self.insights.update(analyze_departments(self.df))

    def analyze_technologies(self):
        self.insights.update(analyze_technologies(self.df))

    def analyze_temporal_patterns(self):
        new_insights, self.df = analyze_temporal_patterns(self.df)
        self.insights.update(new_insights)

    def cross_analysis(self):
        self.insights.update(cross_analysis(self.df))
