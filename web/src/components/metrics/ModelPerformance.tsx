import React from 'react';
import { Brain, Target, Award, Activity } from 'lucide-react';

interface ModelMetrics {
  mae: number;
  rmse: number;
  r2: number;
  mape: number;
}

const ModelPerformance: React.FC<{ modelMetrics: ModelMetrics }> = ({ modelMetrics }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Rendimiento del Modelo Predictivo</h2>
          <p className="text-xl text-gray-600">Métricas de precisión del modelo de Machine Learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
            <Brain className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-900 mb-1">{modelMetrics.mae.toFixed(1)}</div>
            <div className="text-blue-700 text-sm font-medium">MAE (Error Absoluto Medio)</div>
            <div className="text-xs text-blue-600 mt-1">MWh</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-900 mb-1">{modelMetrics.rmse.toFixed(1)}</div>
            <div className="text-green-700 text-sm font-medium">RMSE (Error Cuadrático Medio)</div>
            <div className="text-xs text-green-600 mt-1">MWh</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-900 mb-1">{(modelMetrics.r2 * 100).toFixed(1)}%</div>
            <div className="text-purple-700 text-sm font-medium">R² (Coeficiente de Determinación)</div>
            <div className="text-xs text-purple-600 mt-1">Precisión del modelo</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
            <Activity className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-orange-900 mb-1">{modelMetrics.mape.toFixed(1)}%</div>
            <div className="text-orange-700 text-sm font-medium">MAPE (Error Porcentual Absoluto)</div>
            <div className="text-xs text-orange-600 mt-1">Error promedio</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelPerformance;
