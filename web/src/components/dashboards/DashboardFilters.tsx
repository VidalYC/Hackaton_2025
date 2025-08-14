import React from 'react';
import { Filter, Calendar, MapPin } from 'lucide-react';

interface DashboardFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({ activeFilter, setActiveFilter }) => (
  <section className="py-8 bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <Filter className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700 font-medium">Filtrar por tipo:</span>
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'production', label: 'Producción' },
            { id: 'growth', label: 'Crecimiento' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === btn.id
                  ? btn.id === 'growth'
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Actualizado: Hoy</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>4 Departamentos</span>
        </div>
      </div>
    </div>
  </section>
);

export default DashboardFilters;
