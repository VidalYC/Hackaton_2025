import React, { useState } from 'react';
import { Menu, X, Home, Zap, BarChart3, FileText, Activity } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'dashboards', label: 'Dashboards', icon: BarChart3 },
    { id: 'reports', label: 'Reportes', icon: FileText },
    { id: 'metrics', label: 'Métricas', icon: Activity },
  ];

  return (
    <>
      {/* HEADER */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-teal-600 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EnergyAnalytics</span>
            </div>

            {/* Botón menú lateral */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY OSCURO */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* MENÚ LATERAL */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Navegación</h2>
            <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      currentPage === item.id ? 'text-blue-700' : 'text-gray-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pie de menú */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="text-center text-xs text-gray-500">
            Plataforma de Analytics <br /> Versión 2.0
          </div>
        </div>
      </div>

    </>
  );
};

export default Navigation;
