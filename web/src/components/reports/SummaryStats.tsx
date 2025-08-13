import React from 'react';

interface SummaryStatsProps {
  totalReports: number;
  availableReports: number;
  totalPages: number;
  departments: number;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({
  totalReports,
  availableReports,
  totalPages,
  departments
}) => {
  const stats = [
    { label: 'Reportes Disponibles', value: totalReports, color: 'text-blue-600' },
    { label: 'Listos para Descarga', value: availableReports, color: 'text-green-600' },
    { label: 'Páginas Totales', value: totalPages, color: 'text-purple-600' },
    { label: 'Departamentos Cubiertos', value: departments, color: 'text-orange-600' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Resumen de Reportes</h2>
        <p className="text-xl text-gray-600 mb-12">Estadísticas de nuestros informes y análisis</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className={`text-3xl font-bold mb-2 ${color}`}>{value}</div>
              <div className="text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummaryStats;
