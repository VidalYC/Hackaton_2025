import React, { useState } from 'react';
import { DashboardHeader, DashboardFilters, DashboardCard, QuickStats, Instructions } from '../components/dashboards/index';

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
      <DashboardHeader />
      <DashboardFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDashboards.map((dashboard) => (
            <DashboardCard key={dashboard.id} dashboard={dashboard} />
          ))}
        </div>
      </section>

      <QuickStats />
      <Instructions />
    </div>
  );
};

export default DashboardsPage;
