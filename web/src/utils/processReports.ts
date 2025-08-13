// utils/processReports.ts
import rawData from '../data/reporte_completo.json';

export function processReports() {
  const data = rawData as any;

  return {
    historico: {
      id: 'reporte-historico',
      title: 'Reporte Histórico de Producción',
      description: 'Análisis anual de la producción energética por departamento y tecnología',
      category: 'production',
      period: 'annual',
      date: data.insights_historicos.informacion_basica.periodo_fin,
      size: '3.2 MB',
      pages: 25,
      type: 'PDF',
      status: 'available',
      highlights: [
        `Producción total: ${data.insights_historicos.estadisticas_produccion.produccion_total_mwh.toLocaleString()} MWh`,
        `Producción promedio: ${Math.round(data.insights_historicos.estadisticas_produccion.produccion_promedio_mwh)} MWh`,
        `Departamento líder: ${data.insights_historicos.departamento_lider.nombre} (${data.insights_historicos.departamento_lider.porcentaje.toFixed(2)}%)`,
        `Tecnología dominante: ${data.insights_historicos.tecnologia_dominante.lider}`
      ],
      downloadUrl: '/pdfs/reporte_historico.pdf'
    },

    crecimiento: {
      id: 'reporte-crecimiento',
      title: 'Reporte de Crecimiento y Tendencias',
      description: 'Evolución histórica y proyecciones futuras del sector energético',
      category: 'growth',
      period: 'annual',
      date: data.fecha_analisis,
      size: '2.5 MB',
      pages: 20,
      type: 'PDF',
      status: 'available',
      highlights: [
        `Crecimiento histórico: ${data.insights_historicos.crecimiento_historico.tasa_crecimiento.toFixed(2)}%`,
        `Tendencia: ${data.insights_historicos.crecimiento_historico.tendencia}`,
        `Nuevo líder proyectado: ${data.insights_predicciones.nuevo_lider}`,
        `Tecnología líder futura: ${data.insights_predicciones.tecnologia_lider_futuro}`
      ],
      downloadUrl: '/pdfs/reporte_crecimiento.pdf'
    },

    regional: {
      id: 'reporte-regional',
      title: 'Comparativa Regional',
      description: 'Desempeño energético por departamento y ranking de producción',
      category: 'regional',
      period: 'annual',
      date: data.fecha_analisis,
      size: '4.0 MB',
      pages: 30,
      type: 'PDF',
      status: 'available',
      highlights: [
        `Top producción: ${Object.keys(data.insights_historicos.rankings_departamentos.ranking_produccion)[0]}`,
        `Top eficiencia: ${Object.keys(data.insights_historicos.rankings_departamentos.ranking_eficiencia)[0]}`,
        `Departamentos analizados: ${Object.keys(data.insights_historicos.analisis_departamentos).length}`
      ],
      downloadUrl: '/pdfs/reporte_regional.pdf'
    },

    tecnologia: {
      id: 'reporte-tecnologia',
      title: 'Rendimiento por Tecnología',
      description: 'Evaluación de Solar y Eólica con métricas de eficiencia y distribución',
      category: 'technology',
      period: 'annual',
      date: data.fecha_analisis,
      size: '3.0 MB',
      pages: 22,
      type: 'PDF',
      status: 'available',
      highlights: [
        `Solar: ${data.insights_historicos.analisis_tecnologias.Solar.produccion_total.toLocaleString()} MWh (${data.insights_historicos.analisis_tecnologias.Solar.participacion_mercado.toFixed(2)}%)`,
        `Eólica: ${data.insights_historicos.analisis_tecnologias.Eólica.produccion_total.toLocaleString()} MWh (${data.insights_historicos.analisis_tecnologias.Eólica.participacion_mercado.toFixed(2)}%)`,
        `Ratio Solar/Eólica: ${data.insights_historicos.comparativa_tecnologica.ratio_solar_eolica.toFixed(2)}`
      ],
      downloadUrl: '/pdfs/reporte_tecnologia.pdf'
    },

    resumen: {
      id: 'reporte-resumen',
      title: 'Resumen Ejecutivo',
      description: 'Principales logros, métricas y recomendaciones estratégicas',
      category: 'summary',
      period: 'annual',
      date: data.fecha_analisis,
      size: '1.8 MB',
      pages: 12,
      type: 'PDF',
      status: 'available',
      highlights: [
        `Producción total: ${data.insights_historicos.estadisticas_produccion.produccion_total_mwh.toLocaleString()} MWh`,
        `Crecimiento anual: ${data.insights_historicos.crecimiento_historico.tasa_crecimiento.toFixed(2)}%`,
        `Departamento líder: ${data.insights_historicos.departamento_lider.nombre}`,
        `Tecnología dominante: ${data.insights_historicos.tecnologia_dominante.lider}`
      ],
      downloadUrl: '/pdfs/reporte_resumen.pdf'
    }
  };
}
