import React from 'react';
import { Zap, TrendingUp, MapPin, Activity } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    { icon: <Zap className="w-8 h-8 text-white" />, bg: "bg-blue-600", value: "2.632.431", label: "MWh Producción Total",  changeColor: "text-green-600", cardBg: "from-blue-50 to-blue-100" },
    { icon: <TrendingUp className="w-8 h-8 text-white" />, bg: "bg-teal-600", value: "396.775", label: "MWh Crecimiento Total", change: "↑ 37.3%", changeColor: "text-green-600", cardBg: "from-teal-50 to-teal-100" },
    { icon: <MapPin className="w-8 h-8 text-white" />, bg: "bg-green-600", value: "4", label: "Departamentos", change: "Caribe colombiano", changeColor: "text-gray-500", cardBg: "from-green-50 to-green-100" },
    { icon: <Activity className="w-8 h-8 text-white" />, bg: "bg-orange-600", value: "2", label: "Tecnologías", change: "Solar y Eólica", changeColor: "text-gray-500", cardBg: "from-orange-50 to-orange-100" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Datos Clave de Producción</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Métricas principales de la producción energética en el Caribe colombiano
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center bg-gradient-to-br ${stat.cardBg} p-6 rounded-xl`}>
              <div className={`${stat.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="font-medium">{stat.label}</p>
              <p className={`${stat.changeColor} text-sm mt-1`}>{stat.change}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
