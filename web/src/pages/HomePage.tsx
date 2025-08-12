import React from 'react';
import { Zap, TrendingUp, MapPin, Activity, BarChart3, FileText, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Análisis Avanzado de
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Producción Energética
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Dashboards interactivos y análisis en tiempo real de la producción de energía solar y eólica 
              en los departamentos del Caribe colombiano
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onPageChange('dashboards')}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Ver Dashboards</span>
              </button>
              <button
                onClick={() => onPageChange('reports')}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Explorar Reportes</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Datos Clave de Producción
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Métricas principales de la producción energética en el Caribe colombiano
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-900 mb-2">223.039</h3>
              <p className="text-blue-700 font-medium">MWh Producción Total</p>
              <p className="text-green-600 text-sm mt-1">↑ 15.6%</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-teal-900 mb-2">396.775</h3>
              <p className="text-teal-700 font-medium">MWh Crecimiento Total</p>
              <p className="text-green-600 text-sm mt-1">↑ 37.3%</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-green-900 mb-2">5</h3>
              <p className="text-green-700 font-medium">Departamentos</p>
              <p className="text-gray-500 text-sm mt-1">Caribe colombiano</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-orange-900 mb-2">2</h3>
              <p className="text-orange-700 font-medium">Tecnologías</p>
              <p className="text-gray-500 text-sm mt-1">Solar y Eólica</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plataforma Completa de Análisis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas avanzadas para el monitoreo y análisis de la producción energética
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dashboards Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Dashboards Interactivos</h3>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg">
                Visualizaciones en tiempo real de la producción energética con filtros por departamento, 
                tecnología y período temporal.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Dashboard de Producción Total</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                  <span>Dashboard de Crecimiento</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Análisis por Tecnología</span>
                </div>
              </div>
              
              <button
                onClick={() => onPageChange('dashboards')}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Explorar Dashboards</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Reports Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Reportes Detallados</h3>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg">
                Informes completos con análisis profundo, tendencias históricas y 
                comparativas regionales para toma de decisiones estratégicas.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Reportes Mensuales</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Análisis de Tendencias</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span>Comparativas Regionales</span>
                </div>
              </div>
              
              <button
                onClick={() => onPageChange('reports')}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Ver Reportes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tecnologías Monitoreadas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seguimiento integral de las principales fuentes de energía renovable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 text-center">
              <div className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">☀️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Energía Solar</h3>
              <p className="text-gray-600 mb-4">
                Monitoreo de plantas fotovoltaicas con análisis de irradiación y eficiencia
              </p>
              <div className="text-3xl font-bold text-yellow-600">119 mil MWh</div>
              <p className="text-gray-500 text-sm">Producción acumulada</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 text-center">
              <div className="bg-blue-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Energía Eólica</h3>
              <p className="text-gray-600 mb-4">
                Seguimiento de parques eólicos con datos de velocidad del viento y generación
              </p>
              <div className="text-3xl font-bold text-blue-600">104 mil MWh</div>
              <p className="text-gray-500 text-sm">Producción acumulada</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Comienza a Explorar los Datos
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Accede a dashboards interactivos y reportes detallados para obtener insights 
            valiosos sobre la producción energética
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('dashboards')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Ver Dashboards</span>
            </button>
            <button
              onClick={() => onPageChange('reports')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Descargar Reportes</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;