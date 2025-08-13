import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { reports } from '../data/reportsData';
import { categories } from '../data/categoriesData';
import ReportCard from '../components/reports/ReportCard';
import ReportFilters from '../components/reports/ReportFilters';
import QuickActions from '../components/reports/QuickActions';
import SummaryStats from '../components/reports/SummaryStats';

const ReportsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filteredReports = reports.filter((r) =>
    (activeCategory === 'all' || r.category === activeCategory) &&
    (selectedPeriod === 'all' || r.period === selectedPeriod)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Reportes y Análisis</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Informes detallados y análisis profundo de la producción energética del Caribe colombiano
          </p>
        </div>
      </section>

      {/* Filters */}
      <ReportFilters
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      {/* Reports */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <QuickActions />

      {/* Summary Stats */}
      <SummaryStats
        totalReports={reports.length}
        availableReports={reports.filter(r => r.status === 'available').length}
        totalPages={reports.reduce((acc, r) => acc + r.pages, 0)}
        departments={5}
      />
    </div>
  );
};

export default ReportsPage;
