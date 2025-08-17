import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mb-4"></div>
      <p className="text-xl text-gray-600">Cargando métricas...</p>
    </div>
  </div>
);

export default LoadingSpinner;
