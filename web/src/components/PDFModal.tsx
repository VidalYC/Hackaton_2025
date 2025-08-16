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

  // Función para manejar el scroll con teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevPage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNextPage();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          // Permitir scroll vertical natural
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, pageNumber, numPages]);

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
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header con controles */}
      <div className="flex justify-between items-center bg-white shadow-sm px-6 py-4 border-b flex-shrink-0">
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
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                title="Página anterior"
              >
                <span className="text-sm font-medium">←</span>
                <span className="text-sm font-medium">Anterior</span>
              </button>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                title="Página siguiente"
              >
                <span className="text-sm font-medium">Siguiente</span>
                <span className="text-sm font-medium">→</span>
              </button>
            </div>
          )}

          {/* Controles de zoom */}
          <div className="flex items-center space-x-2 border-l pl-3">
            <button
              onClick={zoomOut}
              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded text-sm flex items-center justify-center transition-colors"
              title="Alejar"
            >
              −
            </button>
            <span className="text-sm text-gray-600 min-w-[3rem] text-center font-medium">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded text-sm flex items-center justify-center transition-colors"
              title="Acercar"
            >
              +
            </button>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="ml-3 w-8 h-8 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center shadow-sm"
            title="Cerrar vista previa"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Contenedor del PDF con scroll */}
      <div className="flex-1 overflow-auto bg-gray-100" style={{ 
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch' // Para mejor scroll en dispositivos móviles
      }}>
        <div className="p-4 min-h-full flex justify-center items-start">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-full">
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
                width={Math.min(containerWidth * 0.9, 800)} // Ajustamos el ancho para dejar espacio al scroll
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
      <div className="bg-white border-t px-6 py-2 text-xs text-gray-500 flex justify-between items-center flex-shrink-0">
        <span>Usa las teclas ← → para navegar entre páginas, ↑ ↓ para hacer scroll</span>
        {numPages > 0 && (
          <span>Total: {numPages} página{numPages !== 1 ? 's' : ''}</span>
        )}
      </div>
    </Modal>
  );
};

export default PDFModal;