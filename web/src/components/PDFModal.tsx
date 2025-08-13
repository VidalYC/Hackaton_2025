// src/components/PDFModal.tsx
import React from 'react';
import Modal from 'react-modal';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configuración correcta del worker
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';
(pdfjs as any).GlobalWorkerOptions.workerSrc = workerSrc;

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const PDFModal: React.FC<PDFModalProps> = ({ isOpen, onClose, pdfUrl }) => {
  const [numPages, setNumPages] = React.useState<number>(0);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Vista previa"
      style={{
        content: {
          width: '90%',
          height: '90%',
          margin: 'auto',
        },
      }}
    >
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">Vista previa</h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 font-bold"
        >
          ✕
        </button>
      </div>
      <div className="overflow-auto h-[calc(100%-50px)]">
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(err) => console.error('Error cargando PDF:', err)}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </Modal>
  );
};

export default PDFModal;
