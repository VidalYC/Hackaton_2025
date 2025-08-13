import React from 'react';

const Instructions: React.FC = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Cómo usar los Dashboards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: 1, color: 'blue', title: 'Selecciona Filtros', text: 'Usa los filtros de tecnología, departamento y fecha para personalizar la vista' },
            { step: 2, color: 'teal', title: 'Explora Visualizaciones', text: 'Interactúa con gráficos, mapas y tablas para obtener insights detallados' },
            { step: 3, color: 'green', title: 'Exporta Datos', text: 'Descarga los datos filtrados para análisis adicionales o reportes' }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className={`bg-${item.color}-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className={`text-${item.color}-600 font-bold`}>{item.step}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Instructions;
