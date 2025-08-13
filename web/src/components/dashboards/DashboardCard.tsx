import React from 'react';
import { ExternalLink, BarChart3, TrendingUp } from 'lucide-react';

interface DashboardCardProps {
  dashboard: {
    id: string;
    title: string;
    description: string;
    type: string;
    metrics: string[];
    color: string;
  };
}

const DashboardCard: React.FC<DashboardCardProps> = ({ dashboard }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    {/* Header */}
    <div className={`bg-gradient-to-r ${
      dashboard.color === 'blue'
        ? 'from-blue-500 to-blue-600'
        : 'from-teal-500 to-teal-600'
    } p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">{dashboard.title}</h3>
        <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors">
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">Abrir en Looker</span>
        </button>
      </div>
      <p className="text-blue-100 text-lg">{dashboard.description}</p>
    </div>

    {/* Metrics */}
    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 grid grid-cols-3 gap-4">
      {dashboard.metrics.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="text-sm font-semibold text-gray-900">{metric.split(' ')[0]}</div>
          <div className="text-xs text-gray-500">{metric.split(' ').slice(1).join(' ')}</div>
        </div>
      ))}
    </div>

    {/* Embed */}
    <div className="p-6">
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors text-center">
        {dashboard.color === 'blue'
          ? <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          : <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
        <p className="text-gray-500 text-lg font-medium mb-2">
          Dashboard de {dashboard.type === 'production' ? 'Producción' : 'Crecimiento'}
        </p>
        <p className="text-gray-400 text-sm mb-4">Aquí se embedería el dashboard de Looker Studio</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-sm mx-auto">
          <p className="text-yellow-800 text-xs">
            <strong>Nota:</strong> Reemplazar con el iframe del dashboard real de Looker Studio
          </p>
        </div>
      </div>
    </div>

    {/* Features */}
    <div className="px-6 pb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-3">Características principales:</h4>
      <div className="grid grid-cols-2 gap-3">
        {['Filtros interactivos', 'Datos en tiempo real', 'Exportación de datos', 'Visualizaciones múltiples'].map((feature, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
            <div className={`w-2 h-2 rounded-full ${
              dashboard.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'
            }`} />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardCard;
