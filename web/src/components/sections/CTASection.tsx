import React from 'react';
import { BarChart3, FileText } from 'lucide-react';

interface CTASectionProps {
  onPageChange: (page: string) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onPageChange }) => {
  return (
    <section className="relative py-20 text-white overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      {/* Fondo animado con blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-56 h-56 bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-44 h-44 bg-green-400 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Contenido */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Comienza a Explorar los Datos
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Accede a dashboards interactivos y reportes detallados para obtener insights 
          valiosos sobre la producción energética
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onPageChange('dashboards')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Ver Dashboards</span>
          </button>
          <button
            onClick={() => onPageChange('reports')}
            className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <FileText className="w-5 h-5" />
            <span>Descargar Reportes</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
