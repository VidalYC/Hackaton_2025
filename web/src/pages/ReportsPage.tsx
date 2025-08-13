import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, BarChart3, MapPin, Filter, Eye, Share2 } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reports = [
    {
      id: 'monthly-production',
      title: 'Reporte Mensual de Producción',
      description: 'Análisis completo de la producción energética mensual por departamento y tecnología',
      category: 'production',
      period: 'monthly',
      date: '2024-12-01',
      size: '2.4 MB',
      pages: 24,
      type: 'PDF',
      status: 'available',
      highlights: ['Magdalena líder con 49 mil MWh', 'Crecimiento del 15.6%', 'Solar supera a eólica']
    },
    {
      id: 'growth-analysis',
      title: 'Análisis de Crecimiento Trimestral',
      description: 'Evaluación detallada de las tendencias de crecimiento y proyecciones futuras',
      category: 'growth',
      period: 'quarterly',
      date: '2024-10-01',
      size: '3.1 MB',
      pages: 32,
      type: 'PDF',
      status: 'available',
      highlights: ['Crecimiento del 37.3%', 'Atlántico en expansión', 'Proyección positiva 2025']
    },
    {
      id: 'regional-comparison',
      title: 'Comparativa Regional del Caribe',
      description: 'Análisis comparativo del rendimiento energético entre departamentos del Caribe',
      category: 'regional',
      period: 'quarterly',
      date: '2024-09-15',
      size: '4.2 MB',
      pages: 45,
      type: 'PDF',
      status: 'available',
      highlights: ['5 departamentos analizados', 'Eficiencia por región', 'Potencial de mejora']
    },
    {
      id: 'technology-performance',
      title: 'Rendimiento por Tecnología',
      description: 'Evaluación del desempeño de tecnologías solar y eólica con métricas de eficiencia',
      category: 'technology',
      period: 'monthly',
      date: '2024-11-30',
      size: '1.8 MB',
      pages: 18,
      type: 'PDF',
      status: 'available',
      highlights: ['Solar: 119 mil MWh', 'Eólica: 104 mil MWh', 'Análisis de eficiencia']
    },
    {
      id: 'annual-summary',
      title: 'Resumen Anual 2024',
      description: 'Informe ejecutivo con los principales logros y métricas del año 2024',
      category: 'summary',
      period: 'annual',
      date: '2024-12-31',
      size: '5.6 MB',
      pages: 68,
      type: 'PDF',
      status: 'processing',
      highlights: ['Resumen ejecutivo', 'Logros del año', 'Proyecciones 2025']
    },
    {
      id: 'efficiency-metrics',
      title: 'Métricas de Eficiencia Operacional',
      description: 'Análisis detallado de KPIs operacionales y métricas de rendimiento',
      category: 'metrics',
      period: 'monthly',
      date: '2024-12-01',
      size: '2.1 MB',
      pages: 22,
      type: 'PDF',
      status: 'available',
      highlights: ['85% eficiencia promedio', 'KPIs operacionales', 'Benchmarking']
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos los Reportes', icon: FileText },
    { id: 'production', label: 'Producción', icon: BarChart3 },
    { id: 'growth', label: 'Crecimiento', icon: TrendingUp },
    { id: 'regional', label: 'Regional', icon: MapPin },
    { id: 'technology', label: 'Tecnología', icon: BarChart3 },
    { id: 'summary', label: 'Resúmenes', icon: FileText },
    { id: 'metrics', label: 'Métricas', icon: TrendingUp }
  ];

  const filteredReports = activeCategory === 'all' 
    ? reports 
    : reports.filter(r => r.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'processing': return 'Procesando';
      default: return 'No disponible';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <FileText className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Reportes y Análisis
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Informes detallados y análisis profundo de los datos de producción energética 
              del Caribe colombiano
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Categoría:</span>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Period Filter */}
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Período:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos</option>
                <option value="monthly">Mensual</option>
                <option value="quarterly">Trimestral</option>
                <option value="annual">Anual</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Report Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{report.description}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusText(report.status)}
                    </div>
                  </div>

                  {/* Report Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>{report.type}</span>
                      <span>{report.pages} páginas</span>
                      <span>{report.size}</span>
                    </div>
                    <span>{new Date(report.date).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                {/* Report Highlights */}
                <div className="p-6 bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Puntos destacados:</h4>
                  <ul className="space-y-2">
                    {report.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Report Actions */}
                <div className="p-6 bg-white">
                  <div className="flex space-x-3">
                    {report.status === 'available' ? (
                      <>
                        <button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Descargar</span>
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>Vista previa</span>
                        </button>
                      </>
                    ) : (
                      <button disabled className="flex-1 bg-gray-100 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                        Procesando...
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
            <p className="text-xl text-gray-600">Herramientas adicionales para el análisis de datos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reporte Personalizado</h3>
              <p className="text-gray-600 mb-6">
                Genera reportes personalizados con los datos y métricas que necesites
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Crear Reporte
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Suscripción Automática</h3>
              <p className="text-gray-600 mb-6">
                Recibe reportes automáticamente en tu email según la frecuencia que elijas
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Configurar
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compartir Análisis</h3>
              <p className="text-gray-600 mb-6">
                Comparte reportes y análisis con tu equipo o stakeholders
              </p>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Compartir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Resumen de Reportes</h2>
            <p className="text-xl text-gray-600">Estadísticas de nuestros informes y análisis</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">{reports.length}</div>
              <div className="text-gray-600">Reportes Disponibles</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {reports.filter(r => r.status === 'available').length}
              </div>
              <div className="text-gray-600">Listos para Descarga</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {reports.reduce((acc, r) => acc + r.pages, 0)}
              </div>
              <div className="text-gray-600">Páginas Totales</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
              <div className="text-gray-600">Departamentos Cubiertos</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;