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
      <style>{`
        :root {
          --fab-background: #4285f4;
          --fab-icon-color: #344955;
          --fab-size: 60px;
          --fab-border-radius: 50%;
        }

        .fab-wrapper {
          position: fixed;
          bottom: 0;
          right: 0;
          width: auto;
          height: auto;
          z-index: 1000;
        }

        .fab-menu {
          width: 40px;
          height: 200px;
          border-radius: 32px;
          position: fixed;
          background: white;
          z-index: 2;
          padding: 0.75rem 0;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          top: 70px;
          right: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          transition: opacity 0.3s ease-in-out, top 0.3s ease-in-out;
          animation: menu-bounce 0.4s ease-out;
        }

        .fab-menu-item {
          color: var(--fab-icon-color);
          opacity: 0.7;
          transition: all 0.2s ease;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .fab-menu-item:hover {
          opacity: 1;
          background: rgba(66, 133, 244, 0.1);
          transform: scale(1.1);
        }

        .fab-menu-item.active {
          opacity: 1;
          background: rgba(66, 133, 244, 0.2);
          color: #4285f4;
        }

        .tooltip {
          position: absolute;
          left: -80px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .fab-menu-item:hover .tooltip {
          opacity: 1;
        }

        @keyframes menu-bounce {
          0% { transform: scale(1, 1); }
          33% { transform: scale(0.95, 1.05); }
          66% { transform: scale(1.05, 0.95); }
          100% { transform: scale(1, 1); }
        }
      `}</style>

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

            {/* Botón menú FAB */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* FAB NAVIGATION - Menú desplegable desde el header */}
      <div className={`fab-wrapper ${isMenuOpen ? 'menu-open' : ''}`} style={{ pointerEvents: 'none' }}>
        <div className="fab-menu" style={{ 
          opacity: isMenuOpen ? 1 : 0,
          top: isMenuOpen ? '70px' : '50px',
          pointerEvents: 'auto'
        }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`fab-menu-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handlePageChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                <div className="tooltip">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;