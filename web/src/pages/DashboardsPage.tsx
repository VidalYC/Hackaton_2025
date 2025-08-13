import React, { useState } from 'react';
import { BarChart3, TrendingUp, ExternalLink, Filter, Calendar, MapPin, Zap } from 'lucide-react';

const DashboardsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const dashboards = [
    {
      id: 'production',
      title: 'Dashboard de Producción Total',
      description: 'Análisis completo de la producción energética por departamento y tecnología',
      type: 'production',
      metrics: ['223.039 MWh Total', '1.312 MWh Promedio', 'Magdalena Líder'],
      color: 'blue'
    },
    {
      id: 'growth',
      title: 'Dashboard de Crecimiento',
      description: 'Seguimiento del crecimiento y tendencias de producción energética',
      type: 'growth',
      metrics: ['396.775 MWh Crecimiento', '1.055,25 MWh Promedio', 'Atlántico Líder'],
      color: 'teal'
    }
  ];

  const filteredDashboards = activeFilter === 'all' 
    ? dashboards 
    : dashboards.filter(d => d.type === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dashboards Interactivos
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Visualizaciones en tiempo real de la producción de energía solar y eólica 
              en los departamentos del Caribe colombiano
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Filtrar por tipo:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setActiveFilter('production')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'production'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Producción
                </button>
                <button
                  onClick={() => setActiveFilter('growth')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'growth'
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Crecimiento
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Actualizado: Hoy</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>5 Departamentos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboards Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredDashboards.map((dashboard) => (
              <div key={dashboard.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Dashboard Header */}
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

                {/* Metrics Bar */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    {dashboard.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{metric.split(' ')[0]}</div>
                        <div className="text-xs text-gray-500">{metric.split(' ').slice(1).join(' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dashboard Embed Area */}
                <div className="p-6">
                  <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                    <div className="text-center">
                      {dashboard.color === 'blue' ? (
                        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      ) : (
                        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      )}
                      <p className="text-gray-500 text-lg font-medium mb-2">
                        Dashboard de {dashboard.type === 'production' ? 'Producción' : 'Crecimiento'}
                      </p>
                      <p className="text-gray-400 text-sm mb-4">
                        Aquí se embedería el dashboard de Looker Studio
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-sm mx-auto">
                        <p className="text-yellow-800 text-xs">
                          <strong>Nota:</strong> Reemplazar con el iframe del dashboard real de Looker Studio
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Features */}
                <div className="px-6 pb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Características principales:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full ${
                        dashboard.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'
                      }`}></div>
                      <span>Filtros interactivos</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full ${
                        dashboard.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'
                      }`}></div>
                      <span>Datos en tiempo real</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full ${
                        dashboard.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'
                      }`}></div>
                      <span>Exportación de datos</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full ${
                        dashboard.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'
                      }`}></div>
                      <span>Visualizaciones múltiples</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Resumen de Datos</h2>
            <p className="text-xl text-gray-600">Métricas clave extraídas de los dashboards</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-900 mb-1">223.039</div>
              <div className="text-blue-700 text-sm">MWh Producción Total</div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-teal-900 mb-1">396.775</div>
              <div className="text-teal-700 text-sm">MWh Crecimiento</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <div className="text-2xl mb-3">☀️</div>
              <div className="text-2xl font-bold text-green-900 mb-1">119 mil</div>
              <div className="text-green-700 text-sm">MWh Solar</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <div className="text-2xl mb-3">💨</div>
              <div className="text-2xl font-bold text-purple-900 mb-1">104 mil</div>
              <div className="text-purple-700 text-sm">MWh Eólica</div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Cómo usar los Dashboards
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Selecciona Filtros</h4>
                <p className="text-gray-600 text-sm">
                  Usa los filtros de tecnología, departamento y fecha para personalizar la vista
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Explora Visualizaciones</h4>
                <p className="text-gray-600 text-sm">
                  Interactúa con gráficos, mapas y tablas para obtener insights detallados
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Exporta Datos</h4>
                <p className="text-gray-600 text-sm">
                  Descarga los datos filtrados para análisis adicionales o reportes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardsPage;