import React from 'react';
import { TrendingUp } from 'lucide-react';

const HeaderSection: React.FC = () => (
  <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-4 rounded-full">
            <TrendingUp className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Métricas y Análisis Avanzado
        </h1>
        <p className="text-xl text-purple-100 max-w-3xl mx-auto">
          KPIs operacionales, métricas de rendimiento y análisis predictivo 
          de la producción energética del Caribe colombiano
        </p>
      </div>
    </div>
  </section>
);

export default HeaderSection;
