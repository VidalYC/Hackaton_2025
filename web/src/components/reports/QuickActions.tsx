import React from 'react';
import { BarChart3, Calendar, Share2 } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      id: 'custom-report',
      title: 'Reporte Personalizado',
      description: 'Genera reportes personalizados con los datos y métricas que necesites',
      icon: BarChart3,
      bgColor: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
      btnColor: 'bg-blue-500 hover:bg-blue-600',
      btnText: 'Crear Reporte'
    },
    {
      id: 'auto-subscription',
      title: 'Suscripción Automática',
      description: 'Recibe reportes automáticamente en tu email según la frecuencia que elijas',
      icon: Calendar,
      bgColor: 'from-green-50 to-green-100',
      iconBg: 'bg-green-500',
      btnColor: 'bg-green-500 hover:bg-green-600',
      btnText: 'Configurar'
    },
    {
      id: 'share-analysis',
      title: 'Compartir Análisis',
      description: 'Comparte reportes y análisis con tu equipo o stakeholders',
      icon: Share2,
      bgColor: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
      btnColor: 'bg-purple-500 hover:bg-purple-600',
      btnText: 'Compartir'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
        <p className="text-xl text-gray-600 mb-12">Herramientas adicionales para el análisis de datos</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map(({ id, title, description, icon: Icon, bgColor, iconBg, btnColor, btnText }) => (
            <div
              key={id}
              className={`bg-gradient-to-br ${bgColor} rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300`}
            >
              <div className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
              <p className="text-gray-600 mb-6">{description}</p>
              <button className={`${btnColor} text-white px-6 py-3 rounded-lg font-medium transition-colors`}>
                {btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
