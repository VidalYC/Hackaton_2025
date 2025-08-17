import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DashboardsPage from './pages/DashboardsPage';
import ReportsPage from './pages/ReportsPage';
import { Zap } from 'lucide-react';
import MetricsPage from './pages/MetricsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'dashboards':
        return <DashboardsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'metrics':
        return <MetricsPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-400 to-teal-600 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">EnergyAnalytics</span>
              </div>
              <p className="text-gray-400">
                Plataforma de análisis avanzado para la producción de energía renovable en el Caribe colombiano.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setCurrentPage('home')} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('dashboards')} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dashboards
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('reports')} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Reportes
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('metrics')} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Metricas
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <p className="text-gray-400 mb-2">
                Para más información sobre nuestros análisis y reportes.
              </p>
              <p className="text-gray-400">
                Email: info@energyanalytics.com
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 EnergyAnalytics. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;