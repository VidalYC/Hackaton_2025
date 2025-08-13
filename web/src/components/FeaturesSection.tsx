import React from 'react';
import { BarChart3, FileText, ArrowRight } from 'lucide-react';

interface FeaturesSectionProps {
  onPageChange: (page: string) => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onPageChange }) => {
  return (
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
  );
};

export default FeaturesSection;
