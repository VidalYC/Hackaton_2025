import React from 'react';
import { Database, Activity, TrendingUp } from 'lucide-react';

const DataQuality: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Calidad de Datos</h2>
          <p className="text-xl text-gray-600">Métricas de integridad y confiabilidad de los datos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
            <Database className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-900 mb-2">99.2%</h3>
            <p className="text-green-700 font-medium mb-2">Completitud de Datos</p>
            <p className="text-green-600 text-sm">Registros completos vs total</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
            <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-900 mb-2">97.8%</h3>
            <p className="text-blue-700 font-medium mb-2">Precisión de Datos</p>
            <p className="text-blue-600 text-sm">Datos validados correctamente</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
            <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-purple-900 mb-2">95.5%</h3>
            <p className="text-purple-700 font-medium mb-2">Consistencia Temporal</p>
            <p className="text-purple-600 text-sm">Coherencia en series de tiempo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataQuality;
