// utils/generateReports.ts
import { jsPDF } from 'jspdf';
import rawData from '../../../data/predictions/reporte_completo.json';
import { reports } from '../data/reportsData';

export function generateAllReports() {
  reports.forEach(report => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text(report.title, 10, 20);

    // Descripción
    doc.setFontSize(12);
    doc.text(report.description, 10, 30);

    // Fecha
    doc.setFontSize(10);
    doc.text(`Fecha: ${report.date}`, 10, 40);

    // Puntos destacados
    doc.setFontSize(14);
    doc.text('Puntos destacados:', 10, 50);
    doc.setFontSize(12);
    report.highlights.forEach((h, i) => {
      doc.text(`- ${h}`, 10, 60 + i * 8);
    });

    // Datos extra del JSON si quieres más detalles
    if (report.id === 'monthly-production') {
      doc.addPage();
      doc.setFontSize(14);
      doc.text('Detalle Mensual de Producción', 10, 20);

      const prodMensual = rawData.insights_historicos.analisis_temporal.patrones_mensuales;
      let y = 30;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.entries(prodMensual).forEach(([mes, info]: any) => {
        doc.text(`Mes ${mes}: Promedio ${Math.round(info.promedio)} MWh`, 10, y);
        y += 8;
      });
    }

    // Guardar el PDF
    doc.save(`${report.id}.pdf`);
  });
}
