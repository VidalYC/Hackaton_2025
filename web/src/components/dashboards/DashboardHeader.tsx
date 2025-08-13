import React from 'react';
import { BarChart3 } from 'lucide-react';

const DashboardHeader: React.FC = () => (
  <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
  </section>
);

export default DashboardHeader;
