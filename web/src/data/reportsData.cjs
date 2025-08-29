// data/reportsData.js
const path = require('path');
const rawData = require(path.join(__dirname, '../../Public/dataProceced/reporte_completo.json'));

const data = rawData;

exports.reports = [
  {
    id: 'monthly-production',
    title: 'Reporte Mensual de Producción',
    description: 'Análisis completo de la producción energética mensual por departamento y tecnología',
    category: 'production',
    period: 'monthly',
    date: data.insights_historicos.informacion_basica.periodo_fin,
    size: '2.4 MB',
    pages: 24,
    type: 'PDF',
    status: 'available',
    highlights: [
      `${data.insights_historicos.departamento_lider.nombre} líder con ${Math.round(data.insights_historicos.departamento_lider.produccion_total / 1000)} mil MWh`,
      `Crecimiento del ${data.insights_historicos.crecimiento_historico.tasa_crecimiento.toFixed(1)}%`,
      `${data.insights_historicos.tecnologia_dominante.lider} supera a ${data.insights_historicos.tecnologia_dominante.lider === 'Solar' ? 'Eólica' : 'Solar'}`
    ],
    downloadUrl: '/public/pdfs/reporte_mensual.pdf'
  },
  {
    id: 'growth-analysis',
    title: 'Análisis de Crecimiento Trimestral',
    description: 'Evaluación detallada de las tendencias de crecimiento y proyecciones futuras',
    category: 'growth',
    period: 'quarterly',
    date: data.fecha_analisis,
    size: '3.1 MB',
    pages: 32,
    type: 'PDF',
    status: 'available',
    highlights: [
      `Crecimiento histórico: ${data.insights_historicos.crecimiento_historico.tasa_crecimiento.toFixed(1)}%`,
      `${data.insights_predicciones.nuevo_lider} en expansión`,
      `Proyección positiva ${new Date(data.fecha_analisis).getFullYear() + 1}`
    ],
    downloadUrl: '/pdfs/reporte_crecimiento.pdf'
  },
  {
    id: 'regional-comparison',
    title: 'Comparativa Regional del Caribe',
    description: 'Análisis comparativo del rendimiento energético entre departamentos del Caribe',
    category: 'regional',
    period: 'quarterly',
    date: data.fecha_analisis,
    size: '4.2 MB',
    pages: 45,
    type: 'PDF',
    status: 'available',
    highlights: [
      `${Object.keys(data.insights_historicos.analisis_departamentos).length} departamentos analizados`,
      `Eficiencia líder: ${Object.keys(data.insights_historicos.rankings_departamentos.ranking_eficiencia)[0]}`,
      'Potencial de mejora identificado'
    ],
    downloadUrl: '/pdfs/reporte_regional.pdf'
  },
  {
    id: 'technology-performance',
    title: 'Rendimiento por Tecnología',
    description: 'Evaluación del desempeño de tecnologías solar y eólica con métricas de eficiencia',
    category: 'technology',
    period: 'monthly',
    date: data.fecha_analisis,
    size: '1.8 MB',
    pages: 18,
    type: 'PDF',
    status: 'available',
    highlights: [
      `Solar: ${Math.round(data.insights_historicos.analisis_tecnologias.Solar.produccion_total / 1000)} mil MWh`,
      `Eólica: ${Math.round(data.insights_historicos.analisis_tecnologias.Eólica.produccion_total / 1000)} mil MWh`,
      'Análisis de eficiencia'
    ],
    downloadUrl: '/pdfs/reporte_tecnologia.pdf'
  },
  {
    id: 'annual-summary',
    title: `Resumen Anual ${new Date(data.fecha_analisis).getFullYear()}`,
    description: `Informe ejecutivo con los principales logros y métricas del año ${new Date(data.fecha_analisis).getFullYear()}`,
    category: 'summary',
    period: 'annual',
    date: data.fecha_analisis,
    size: '5.6 MB',
    pages: 68,
    type: 'PDF',
    status: 'available',
    highlights: [
      'Resumen ejecutivo',
      'Logros del año',
      `Proyecciones ${new Date(data.fecha_analisis).getFullYear() + 1}`
    ],
    downloadUrl: '/pdfs/reporte_resumen.pdf'
  },
  {
    id: 'efficiency-metrics',
    title: 'Métricas de Eficiencia Operacional',
    description: 'Análisis detallado de KPIs operacionales y métricas de rendimiento',
    category: 'metrics',
    period: 'monthly',
    date: data.fecha_analisis,
    size: '2.1 MB',
    pages: 22,
    type: 'PDF',
    status: 'available',
    highlights: [
      `${Math.round(
        Object.values(data.insights_historicos.eficiencia_departamental)
          .reduce((sum, dept) => sum + dept.produccion_promedio, 0) /
        Object.keys(data.insights_historicos.eficiencia_departamental).length
      )} MWh eficiencia promedio`,
      'KPIs operacionales',
      'Benchmarking'
    ],
    downloadUrl: '/pdfs/reporte_eficiencia.pdf'
  }
];
