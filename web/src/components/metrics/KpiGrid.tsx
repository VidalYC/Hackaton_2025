import React from 'react';

interface Kpi {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: string;
  description: string;
  category: string;
}

interface Category {
  id: string;
  label: string;
}

interface KpiGridProps {
  kpiMetrics: Kpi[];
  categories: Category[];
}

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'up': return 'text-green-600';
    case 'down': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '↗';
    case 'down': return '↘';
    default: return '→';
  }
};

const KpiGrid: React.FC<KpiGridProps> = ({ kpiMetrics, categories }) => (
  <section className="py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Indicadores Clave de Rendimiento</h2>
        <p className="text-xl text-gray-600">Métricas principales para el monitoreo operacional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
              <div className={`text-2xl ${getTrendColor(metric.trend)}`}>
                {getTrendIcon(metric.trend)}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                {metric.change} vs período anterior
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">{metric.description}</p>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                metric.category === 'operational' ? 'bg-blue-100 text-blue-800' :
                metric.category === 'performance' ? 'bg-green-100 text-green-800' :
                metric.category === 'analytics' ? 'bg-purple-100 text-purple-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {categories.find(c => c.id === metric.category)?.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default KpiGrid;
