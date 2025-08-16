// build-pdfs-clean.cjs
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { reports } = require('../data/reportsData.cjs');
const rawData = require('../../../data/predictions/reporte_completo.json');

// ==========================
// Estilos CSS limpios
// ==========================
const getCleanStyles = () => `
<style>
  @page { 
    margin: 2cm; 
    size: A4; 
  }
  
  * { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  
  body { 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    line-height: 1.5; 
    color: #2d3748; 
    font-size: 12px;
  }
  
  .header { 
    text-align: center; 
    border-bottom: 2px solid #3182ce; 
    padding-bottom: 20px; 
    margin-bottom: 30px;
    background: #f7fafc;
    padding: 30px;
    border-radius: 8px;
  }
  
  .header h1 { 
    font-size: 24px; 
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 10px;
  }
  
  .header p { 
    font-size: 14px;
    color: #4a5568;
    margin: 5px 0;
  }
  
  .section { 
    page-break-inside: avoid; 
    margin: 25px 0; 
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 20px;
  }
  
  .section-title { 
    font-size: 18px; 
    font-weight: 600; 
    color: #2d3748; 
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #cbd5e0;
  }
  
  table { 
    width: 100%; 
    border-collapse: collapse; 
    margin: 20px 0; 
    font-size: 11px;
    background: white;
  }
  
  th { 
    background: #4299e1; 
    color: white; 
    padding: 12px 8px; 
    text-align: left; 
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  td { 
    padding: 10px 8px; 
    border-bottom: 1px solid #e2e8f0;
  }
  
  tr:nth-child(even) { 
    background-color: #f8f9fa; 
  }
  
  .metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin: 20px 0;
  }
  
  .metric-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    border: 1px solid #e2e8f0;
  }
  
  .metric-value {
    font-size: 20px;
    font-weight: bold;
    color: #2d3748;
    display: block;
    margin-bottom: 5px;
  }
  
  .metric-label {
    font-size: 10px;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .highlights {
    background: #f0fff4;
    border: 1px solid #9ae6b4;
    border-radius: 6px;
    padding: 15px;
    margin: 20px 0;
  }
  
  .highlights h4 {
    color: #276749;
    margin-bottom: 10px;
    font-size: 14px;
  }
  
  .highlights ul {
    padding-left: 20px;
  }
  
  .highlights li {
    margin: 6px 0;
    color: #276749;
    font-size: 11px;
  }
  
  .data-bar {
    background: #e2e8f0;
    height: 20px;
    border-radius: 10px;
    overflow: hidden;
    margin: 5px 0;
    position: relative;
  }
  
  .data-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #4299e1, #3182ce);
    border-radius: 10px;
    transition: width 0.3s ease;
  }
  
  .data-bar-label {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    font-weight: 600;
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }
  
  .chart-replacement {
    background: #f8f9fa;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 20px;
    margin: 20px 0;
  }
  
  .chart-title {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .bar-chart {
    margin: 15px 0;
  }
  
  .bar-item {
    display: flex;
    align-items: center;
    margin: 8px 0;
    font-size: 11px;
  }
  
  .bar-label {
    width: 100px;
    font-weight: 500;
    color: #4a5568;
  }
  
  .bar-container {
    flex: 1;
    margin: 0 10px;
  }
  
  .bar-value {
    width: 80px;
    text-align: right;
    font-weight: 600;
    color: #2d3748;
  }
</style>
`;

// ==========================
// Funciones para crear visualizaciones simples
// ==========================
function createTable(headers, rows, title = null) {
  return `
    ${title ? `<h3 class="section-title">${title}</h3>` : ''}
    <table>
      <thead>
        <tr>
          ${headers.map(h => `<th>${h}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.map(row => `
          <tr>
            ${row.map(cell => `<td>${cell}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function createSimpleBarChart(data, title) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return `
    <div class="chart-replacement">
      <div class="chart-title">${title}</div>
      <div class="bar-chart">
        ${data.map(item => `
          <div class="bar-item">
            <div class="bar-label">${item.label}</div>
            <div class="bar-container">
              <div class="data-bar">
                <div class="data-bar-fill" style="width: ${(item.value / maxValue) * 100}%"></div>
                <div class="data-bar-label">${item.value.toLocaleString()}</div>
              </div>
            </div>
            <div class="bar-value">${item.value.toLocaleString()}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function createMetricCards(metrics) {
  return `
    <div class="metric-grid">
      ${metrics.map(metric => `
        <div class="metric-card">
          <span class="metric-value">${metric.value}</span>
          <span class="metric-label">${metric.label}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ==========================
// Generadores por reporte
// ==========================
function generateMonthlyProductionHTML() {
  const monthly = rawData.insights_historicos.analisis_temporal.patrones_mensuales;
  const labels = Object.keys(monthly);
  const chartData = labels.map(m => ({
    label: `Mes ${m}`,
    value: Math.round(monthly[m].promedio)
  }));

  const monthlyChart = createSimpleBarChart(chartData, 'Producción Mensual 2024');

  const tableMonthly = createTable(
    ['Mes', 'Promedio (MWh)', 'Mínimo (MWh)', 'Máximo (MWh)'],
    labels.map(m => [
      m, 
      monthly[m].promedio.toLocaleString('es-CO'),
      monthly[m].minimo.toLocaleString('es-CO'),
      monthly[m].maximo.toLocaleString('es-CO')
    ]),
    'Datos de Producción Mensual'
  );

  // Datos departamentales
  const depData = rawData.insights_historicos.analisis_departamentos;
  const depLabels = Object.keys(depData);
  const depChartData = depLabels.map(d => ({
    label: d,
    value: depData[d].produccion_total
  }));

  const depChart = createSimpleBarChart(depChartData, 'Producción por Departamento');

  const tableDep = createTable(
    ['Departamento', 'Total (MWh)', 'Promedio (MWh)'],
    depLabels.map(d => [
      d,
      depData[d].produccion_total.toLocaleString('es-CO'),
      depData[d].produccion_promedio.toLocaleString('es-CO')
    ]),
    'Análisis por Departamento'
  );

  // Datos tecnología
  const techData = rawData.insights_historicos.analisis_tecnologias;
  const techLabels = Object.keys(techData);
  const techChartData = techLabels.map(t => ({
    label: t,
    value: techData[t].produccion_total
  }));

  const techChart = createSimpleBarChart(techChartData, 'Producción por Tecnología');

  return `
    <div class="section">
      ${monthlyChart}
      ${tableMonthly}
    </div>
    
    <div class="section">
      ${depChart}
      ${tableDep}
    </div>
    
    <div class="section">
      ${techChart}
    </div>
  `;
}

function generateRegionalComparisonHTML() {
  const depData = rawData.insights_historicos.analisis_departamentos;
  const totalProduction = Object.values(depData).reduce((sum, dep) => sum + dep.produccion_total, 0);
  
  const chartData = Object.entries(depData).map(([dep, info]) => ({
    label: dep,
    value: info.produccion_total
  }));

  const chart = createSimpleBarChart(chartData, 'Distribución Regional de Producción');

  const table = createTable(
    ['Departamento', 'Producción Total (MWh)', 'Promedio (MWh)', 'Participación (%)'],
    Object.entries(depData).map(([dep, info]) => [
      dep,
      info.produccion_total.toLocaleString('es-CO'),
      info.produccion_promedio.toLocaleString('es-CO'),
      ((info.produccion_total / totalProduction) * 100).toFixed(1) + '%'
    ]),
    'Comparativa Regional Detallada'
  );

  return `
    <div class="section">
      ${chart}
      ${table}
    </div>
  `;
}

function generateTechnologyPerformanceHTML() {
  const techData = rawData.insights_historicos.analisis_tecnologias;
  
  const chartData = Object.entries(techData).map(([tech, info]) => ({
    label: tech,
    value: info.produccion_total
  }));

  const chart = createSimpleBarChart(chartData, 'Rendimiento por Tecnología');

  const table = createTable(
    ['Tecnología', 'Total (MWh)', 'Promedio (MWh)', 'Eficiencia'],
    Object.entries(techData).map(([tech, info]) => [
      tech,
      info.produccion_total.toLocaleString('es-CO'),
      info.produccion_promedio.toLocaleString('es-CO'),
      ((info.produccion_total / info.produccion_promedio) / 100).toFixed(2)
    ]),
    'Métricas de Rendimiento Tecnológico'
  );

  return `
    <div class="section">
      ${chart}
      ${table}
    </div>
  `;
}

function generateEfficiencyMetricsHTML() {
  const effData = rawData.insights_historicos.rankings_departamentos.ranking_eficiencia;
  const values = Object.values(effData);
  
  const maxEff = Math.max(...values);
  const minEff = Math.min(...values);
  const avgEff = values.reduce((a,b) => a+b, 0) / values.length;

  const metrics = createMetricCards([
    { value: maxEff.toFixed(2), label: 'Máxima Eficiencia' },
    { value: avgEff.toFixed(2), label: 'Promedio Nacional' },
    { value: minEff.toFixed(2), label: 'Mínima Eficiencia' }
  ]);

  const chartData = Object.entries(effData).map(([dep, value]) => ({
    label: dep,
    value: value
  }));

  const chart = createSimpleBarChart(chartData, 'Ranking de Eficiencia Departamental');

  return `
    <div class="section">
      ${metrics}
      ${chart}
    </div>
  `;
}

function generateGrowthAnalysisHTML() {
  const pred = rawData.insights_predicciones;

  const metrics = createMetricCards([
    { value: pred.nuevo_lider, label: 'Nuevo Líder' },
    { value: pred.tecnologia_lider_futuro, label: 'Tecnología Líder' },
    { value: pred.cambio_promedio_ml.toFixed(1) + '%', label: 'Cambio ML' },
    { value: pred.cambio_promedio_prophet.toFixed(1) + '%', label: 'Cambio Prophet' }
  ]);

  const recommendations = `
    <div class="highlights">
      <h4>Recomendaciones:</h4>
      <ul>
        ${pred.recomendaciones.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>
  `;

  // Análisis trimestral si existe
  const trimestral = rawData.insights_historicos.analisis_temporal.patrones_trimestrales;
  let trimestralChart = '';
  
  if (trimestral && Object.keys(trimestral).length > 0) {
    const chartData = Object.entries(trimestral).map(([trim, info]) => ({
      label: `T${trim}`,
      value: Math.round(info.promedio)
    }));
    trimestralChart = createSimpleBarChart(chartData, 'Evolución Trimestral');
  }

  return `
    <div class="section">
      <h3 class="section-title">Proyecciones 2025</h3>
      ${metrics}
      ${recommendations}
    </div>
    ${trimestralChart ? `<div class="section">${trimestralChart}</div>` : ''}
  `;
}

// ==========================
// Generación PDFs
// ==========================
async function generatePDF(report) {
  let contentHTML = '';
  
  switch(report.id) {
    case 'monthly-production':
      contentHTML = generateMonthlyProductionHTML();
      break;
    case 'regional-comparison':
      contentHTML = generateRegionalComparisonHTML();
      break;
    case 'technology-performance':
      contentHTML = generateTechnologyPerformanceHTML();
      break;
    case 'efficiency-metrics':
      contentHTML = generateEfficiencyMetricsHTML();
      break;
    case 'growth-analysis':
      contentHTML = generateGrowthAnalysisHTML();
      break;
    case 'annual-summary':
      contentHTML = generateMonthlyProductionHTML() + generateGrowthAnalysisHTML();
      break;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${report.title}</title>
      ${getCleanStyles()}
    </head>
    <body>
      <div class="header">
        <h1>${report.title}</h1>
        <p>Fecha: ${report.date}</p>
        <p>Análisis del Sector Energético Colombiano</p>
      </div>
      
      <div class="highlights">
        <h4>Puntos Destacados:</h4>
        <ul>
          ${report.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
      
      ${contentHTML}
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  
  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { 
      top: '2cm', 
      right: '1.5cm', 
      bottom: '2cm', 
      left: '1.5cm' 
    }
  });
  
  await browser.close();
  return pdf;
}

// ==========================
// Función principal
// ==========================
(async () => {
  const outputDir = path.join(__dirname, '../../public/pdfs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Iniciando generación de PDFs limpios...');

  for (const report of reports) {
    try {
      console.log(`📄 Generando: ${report.title}...`);
      const pdfBuffer = await generatePDF(report);
      const filePath = path.join(outputDir, `${report.id}.pdf`);
      fs.writeFileSync(filePath, pdfBuffer);
      console.log(`✅ Generado exitosamente: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error generando ${report.id}:`, error);
    }
  }
  
  console.log('🎉 ¡Generación de PDFs completada!');
})().catch(console.error);