import React from 'react';

const TechnologyOverview: React.FC = () => {
  return (
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
          {/* Solar */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 text-center">
            <div className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">☀️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Energía Solar</h3>
            <p className="text-gray-600 mb-4">
              Monitoreo de plantas fotovoltaicas con análisis de irradiación y eficiencia
            </p>
            <div className="text-3xl font-bold text-yellow-600">1.4 mill MWh</div>
            <p className="text-gray-500 text-sm">Producción acumulada</p>
          </div>

          {/* Wind */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 text-center">
            <div className="bg-blue-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">💨</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Energía Eólica</h3>
            <p className="text-gray-600 mb-4">
              Seguimiento de parques eólicos con datos de velocidad del viento y generación
            </p>
            <div className="text-3xl font-bold text-blue-600">1.19 mill MWh</div>
            <p className="text-gray-500 text-sm">Producción acumulada</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyOverview;
