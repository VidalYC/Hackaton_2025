import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';

const QuickStats: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Resumen de Datos</h2>
        <p className="text-xl text-gray-600">Métricas clave extraídas de los dashboards</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
          <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-blue-900 mb-1">2.632.431</div>
          <div className="text-blue-700 text-sm">MWh Producción Total</div>
        </div>
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 text-center">
          <TrendingUp className="w-8 h-8 text-teal-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-teal-900 mb-1">396.775</div>
          <div className="text-teal-700 text-sm">MWh Crecimiento</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
          <div className="text-2xl mb-3">☀️</div>
          <div className="text-2xl font-bold text-green-900 mb-1">1.4 mill</div>
          <div className="text-green-700 text-sm">MWh Solar</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
          <div className="text-2xl mb-3">💨</div>
          <div className="text-2xl font-bold text-purple-900 mb-1">1.19 mill</div>
          <div className="text-purple-700 text-sm">MWh Eólica</div>
        </div>
      </div>
    </div>
  </section>
);

export default QuickStats;
