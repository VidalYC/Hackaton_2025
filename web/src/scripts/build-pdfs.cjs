// build-pdfs.cjs
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { reports } = require('../data/reportsData.cjs');
const rawData = require('../../../data/predictions/reporte_completo.json');

// ==========================
// Utilidades
// ==========================
function ensureSpace(doc, neededHeight) {
  if (doc.y + neededHeight > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
  }
}

async function insertChartWithTitle(doc, type, labels, dataValues, label, color, title) {
  ensureSpace(doc, 350);
  doc.fontSize(14).font('Helvetica-Bold').text(title);
  doc.moveDown(0.5);
  const chart = await createChartImage(type, labels, dataValues, label, color);
  doc.image(chart, { fit: [500, 300] });
  doc.moveDown(1);
}

async function createChartImage(type, labels, dataValues, label, color) {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 600, height: 300 });
  const configuration = {
    type,
    data: {
      labels,
      datasets: [
        {
          label,
          data: dataValues,
          backgroundColor: Array.isArray(color) ? color : [color],
          borderColor: 'rgba(0,0,0,0.1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: type !== 'pie' ? { y: { beginAtZero: true } } : {}
    }
  };
  return await chartJSNodeCanvas.renderToBuffer(configuration);
}

function drawTable(doc, headers, rows, title = null) {
  ensureSpace(doc, (rows.length + 2) * 20);
  if (title) {
    doc.fontSize(14).font('Helvetica-Bold').text(title);
    doc.moveDown(0.5);
  }
  const colWidth = (doc.page.width - doc.page.margins.left - doc.page.margins.right) / headers.length;
  const rowHeight = 20;
  let y = doc.y;

  doc.font('Helvetica-Bold');
  headers.forEach((header, i) => doc.text(header, doc.page.margins.left + i * colWidth, y));
  y += rowHeight;
  doc.font('Helvetica');

  rows.forEach(row => {
    if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
      doc.addPage();
      y = doc.page.margins.top;
      doc.font('Helvetica-Bold');
      headers.forEach((header, i) => doc.text(header, doc.page.margins.left + i * colWidth, y));
      y += rowHeight;
      doc.font('Helvetica');
    }
    row.forEach((cell, i) => {
      doc.text(cell.toString(), doc.page.margins.left + i * colWidth, y);
    });
    y += rowHeight;
  });
  doc.moveDown();
}

// ==========================
// Funciones por reporte
// ==========================
async function generateMonthlyProduction(doc) {
  const monthly = rawData.insights_historicos.analisis_temporal.patrones_mensuales;
  const labels = Object.keys(monthly);
  const values = labels.map(m => Math.round(monthly[m].promedio));

  await insertChartWithTitle(doc, 'bar', labels, values, 'Promedio MWh', 'rgba(54,162,235,0.7)', 'Producción mensual 2024');
  drawTable(doc, ['Mes', 'Promedio', 'Mínimo', 'Máximo'],
    labels.map(m => [m, monthly[m].promedio, monthly[m].minimo, monthly[m].maximo]),
    'Tabla de producción mensual');

  const depData = rawData.insights_historicos.analisis_departamentos;
  const depLabels = Object.keys(depData);
  const depVals = depLabels.map(d => depData[d].produccion_total);
  await insertChartWithTitle(doc, 'bar', depLabels, depVals, 'Producción Total MWh', 'rgba(255,159,64,0.7)', 'Producción total por departamento');
  drawTable(doc, ['Departamento', 'Total', 'Promedio'],
    depLabels.map(d => [d, depData[d].produccion_total, depData[d].produccion_promedio]),
    'Tabla de departamentos');

  const techData = rawData.insights_historicos.analisis_tecnologias;
  const techLabels = Object.keys(techData);
  const techVals = techLabels.map(t => techData[t].produccion_total);
  await insertChartWithTitle(doc, 'bar', techLabels, techVals, 'Producción Total MWh', 'rgba(75,192,192,0.7)', 'Producción por tecnología');

  const effData = rawData.insights_historicos.rankings_departamentos.ranking_eficiencia;
  const effLabels = Object.keys(effData);
  const effVals = effLabels.map(d => effData[d]);
  await insertChartWithTitle(doc, 'bar', effLabels, effVals, 'Eficiencia', 'rgba(153,102,255,0.7)', 'Ranking de eficiencia departamental');

  const evolLabels = Object.keys(monthly);
  const evolVals = evolLabels.map(m => monthly[m].promedio);
  await insertChartWithTitle(doc, 'line', evolLabels, evolVals, 'Producción Promedio', 'rgba(255,99,132,0.7)', 'Evolución temporal');
}

async function generateRegionalComparison(doc) {
  const depData = rawData.insights_historicos.analisis_departamentos;
  drawTable(doc, ['Departamento', 'Producción Total', 'Promedio'],
    Object.entries(depData).map(([dep, info]) => [dep, info.produccion_total, info.produccion_promedio]),
    'Comparativa regional Caribe');

  const labels = Object.keys(depData);
  const totals = labels.map(d => depData[d].produccion_total);
  await insertChartWithTitle(doc, 'pie', labels, totals, 'Participación %', ['#FF6384','#36A2EB','#FFCE56','#4BC0C0'], 'Porcentaje de participación');
}

async function generateTechnologyPerformance(doc) {
  const techData = rawData.insights_historicos.analisis_tecnologias;
  const labels = Object.keys(techData);
  const totals = labels.map(t => techData[t].produccion_total);
  await insertChartWithTitle(doc, 'bar', labels, totals, 'Producción Total', 'rgba(255,206,86,0.7)', 'Producción por tecnología');
  drawTable(doc, ['Tecnología', 'Total', 'Promedio'],
    labels.map(t => [t, techData[t].produccion_total, techData[t].produccion_promedio]),
    'Métricas de eficiencia por tecnología');
}

async function generateEfficiencyMetrics(doc) {
  const effData = rawData.insights_historicos.rankings_departamentos.ranking_eficiencia;
  const labels = Object.keys(effData);
  const vals = labels.map(d => effData[d]);
  await insertChartWithTitle(doc, 'bar', labels, vals, 'Eficiencia', 'rgba(54,162,235,0.7)', 'Eficiencia por departamento');
}

async function generateGrowthAnalysis(doc) {
  const trimestral = rawData.insights_historicos.analisis_temporal.patrones_trimestrales;
  if (trimestral && Object.keys(trimestral).length > 0) {
    const labels = Object.keys(trimestral);
    const vals = labels.map(t => trimestral[t].promedio);
    await insertChartWithTitle(doc, 'line', labels, vals, 'Promedio MWh', 'rgba(153,102,255,0.7)', 'Evolución por trimestre');
  }

  const pred = rawData.insights_predicciones;
  drawTable(doc, ['Nuevo líder', 'Tecnología futura', 'Cambio ML', 'Cambio Prophet'],
    [[pred.nuevo_lider, pred.tecnologia_lider_futuro, pred.cambio_promedio_ml, pred.cambio_promedio_prophet]],
    'Proyecciones 2025');
  pred.recomendaciones.forEach(r => doc.text(`- ${r}`));
}

async function generateAnnualSummary(doc) {
  doc.fontSize(16).font('Helvetica-Bold').text('Resumen anual 2024 y proyecciones 2025');
  await generateMonthlyProduction(doc);
  await generateGrowthAnalysis(doc);
}

// ==========================
// Generación PDFs
// ==========================
(async () => {
  const outputDir = path.join(__dirname, '../../public/pdfs');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (const report of reports) {
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    const filePath = path.join(outputDir, `${report.id}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(22).font('Helvetica-Bold').text(report.title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).font('Helvetica').text(`Fecha: ${report.date}`, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(12).font('Helvetica-Bold').text('Resumen:');
    report.highlights.forEach(h => doc.font('Helvetica').text(`- ${h}`));

    doc.addPage();
    if (report.id === 'monthly-production') await generateMonthlyProduction(doc);
    if (report.id === 'regional-comparison') await generateRegionalComparison(doc);
    if (report.id === 'technology-performance') await generateTechnologyPerformance(doc);
    if (report.id === 'efficiency-metrics') await generateEfficiencyMetrics(doc);
    if (report.id === 'growth-analysis') await generateGrowthAnalysis(doc);
    if (report.id === 'annual-summary') await generateAnnualSummary(doc);

    doc.end();
    console.log(`✅ Generado: ${filePath}`);
  }
})();
