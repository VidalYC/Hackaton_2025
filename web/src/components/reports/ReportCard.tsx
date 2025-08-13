import React, { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import { getStatusColor, getStatusText } from '../../utils/reportUtils';
import PDFModal from '../PDFModal';

interface ReportCardProps {
  report: any;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{report.description}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
              {getStatusText(report.status)}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{report.type}</span>
              <span>{report.pages} páginas</span>
              <span>{report.size}</span>
            </div>
            <span>{new Date(report.date).toLocaleDateString('es-ES')}</span>
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Puntos destacados:</h4>
          <ul className="space-y-2">
            {report.highlights.map((highlight: string, index: number) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-white">
          <div className="flex space-x-3">
            {report.status === 'available' ? (
              <>
                <a
                  href={report.downloadUrl}
                  download
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium
                             text-white bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-600
                             transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </a>

                <button
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Vista previa</span>
                </button>
              </>
            ) : (
              <button
                disabled
                className="flex-1 bg-gray-100 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
              >
                Procesando...
              </button>
            )}
          </div>
        </div>
      </div>

      <PDFModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        pdfUrl={report.downloadUrl}
      />
    </>
  );
};

export default ReportCard;
