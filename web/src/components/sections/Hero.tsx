import React from 'react';
import { ChevronRight, Zap, BarChart } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white overflow-hidden"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{ ["--header-height" as any]: "80px" }}
    >
      {/* Fondo animado con blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-56 h-56 bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-44 h-44 bg-green-400 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Texto */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-cyan-600 font-medium">
                <Zap className="h-5 w-5 animate-bounce" />
                <span>Análisis Avanzado de Energías Renovables</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Potencia tu </span>
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient">
                  Futuro Energético
                </span>
                <span className="text-gray-900"> con IA</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Transformamos datos complejos de energía solar y eólica en insights accionables.
                Predicciones precisas, análisis profundo y visualizaciones interactivas para optimizar tu estrategia energética.
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={scrollToDashboard}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2"
              >
                <BarChart className="h-5 w-5" />
                <span>Ver Dashboard</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() =>
                  document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="border-2 border-cyan-500 text-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Explorar Insights</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">2.6M+</div>
                <div className="text-sm text-gray-600">MWh Analizados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Precisión</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">4</div>
                <div className="text-sm text-gray-600">Departamentos</div>
              </div>
            </div>
          </div>

          {/* Tarjeta visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:shadow-3xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <BarChart className="h-12 w-12 text-white" />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Producción Energética</h3>
                  <div className="text-2xl font-bold text-green-600">↗ +17%</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Solar</span>
                    <span className="font-semibold">1.44M MWh</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-3/5 animate-pulse"></div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Eólica</span>
                    <span className="font-semibold">1.19M MWh</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
