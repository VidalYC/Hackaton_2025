// src/components/PDFModal.tsx
import React, { useState, useEffect } from 'react';
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
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    const updateWidth = () => {
      const modalWidth = window.innerWidth * 0.95;
      setContainerWidth(modalWidth - 100); // Restamos padding y margin
    };

    if (isOpen) {
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, [isOpen]);

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.2);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Vista previa PDF"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'relative',
          width: '95vw',
          height: '95vh',
          maxWidth: 'none',
          maxHeight: 'none',
          margin: 0,
          padding: 0,
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          inset: 'auto',
          overflow: 'hidden',
        },
      }}
    >
      {/* Header con controles */}
      <div className="flex justify-between items-center bg-white shadow-sm px-6 py-4 border-b">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-800">Vista previa PDF</h2>
          {numPages > 0 && (
            <span className="text-sm text-gray-600">
              Página {pageNumber} de {numPages}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Controles de navegación */}
          {numPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
              >
                ◀ Anterior
              </button>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
              >
                Siguiente ▶
              </button>
            </div>
          )}

          {/* Controles de zoom */}
          <div className="flex items-center space-x-2 border-l pl-3">
            <button
              onClick={zoomOut}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              title="Alejar"
            >
              −
            </button>
            <span className="text-sm text-gray-600 min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              title="Acercar"
            >
              +
            </button>
            <button
              onClick={resetZoom}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs"
              title="Zoom normal"
            >
              Reset
            </button>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="ml-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Cerrar ✕
          </button>
        </div>
      </div>

      {/* Contenedor del PDF */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Document
              file={pdfUrl}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setPageNumber(1);
              }}
              onLoadError={(err) => console.error('Error cargando PDF:', err)}
              loading={
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-600">Cargando PDF...</span>
                </div>
              }
              error={
                <div className="flex items-center justify-center p-8 text-red-600">
                  <span>Error al cargar el PDF. Verifica la URL.</span>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                width={Math.min(containerWidth, 800)}
                loading={
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-pulse bg-gray-200 w-full h-[600px] rounded"></div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center p-4 text-red-600">
                    <span>Error al cargar la página</span>
                  </div>
                }
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          </div>
        </div>
      </div>

      {/* Footer con información adicional */}
      <div className="bg-white border-t px-6 py-2 text-xs text-gray-500 flex justify-between items-center">
        <span>Usa las teclas ← → para navegar entre páginas</span>
        {numPages > 0 && (
          <span>Total: {numPages} página{numPages !== 1 ? 's' : ''}</span>
        )}
      </div>
    </Modal>
  );
};

export default PDFModal;