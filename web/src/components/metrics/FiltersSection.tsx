import React from 'react';
import { Filter } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FiltersSectionProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  categories: Category[];
}


const FiltersSection: React.FC<FiltersSectionProps> = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Categoría:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiltersSection;
