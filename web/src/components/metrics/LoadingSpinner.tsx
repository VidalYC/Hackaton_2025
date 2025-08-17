import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <>
      <style>{`
        .loader {
          box-sizing: border-box;
          display: inline-block;
          width: 50px;
          height: 80px;
          border-top: 5px solid #4285f4;
          border-bottom: 5px solid #4285f4;
          position: relative;
          background: linear-gradient(#4285f4 30px, transparent 0) no-repeat;
          background-size: 2px 40px;
          background-position: 50% 0px;
          animation: spinx 5s linear infinite;
        }

        .loader:before,
        .loader:after {
          content: "";
          width: 40px;
          left: 50%;
          height: 35px;
          position: absolute;
          top: 0;
          transform: translatex(-50%);
          background: rgba(66, 133, 244, 0.4);
          border-radius: 0 0 20px 20px;
          background-size: 100% auto;
          background-repeat: no-repeat;
          background-position: 0 0px;
          animation: lqt 5s linear infinite;
        }

        .loader:after {
          top: auto;
          bottom: 0;
          border-radius: 20px 20px 0 0;
          animation: lqb 5s linear infinite;
        }

        @keyframes lqt {
          0%, 100% {
            background-image: linear-gradient(#4285f4 40px, transparent 0);
            background-position: 0% 0px;
          }
          50% {
            background-image: linear-gradient(#4285f4 40px, transparent 0);
            background-position: 0% 40px;
          }
          50.1% {
            background-image: linear-gradient(#4285f4 40px, transparent 0);
            background-position: 0% -40px;
          }
        }

        @keyframes lqb {
          0% {
            background-image: linear-gradient(#4285f4 40px, transparent 0);
            background-position: 0 40px;
          }
          100% {
            background-image: linear-gradient(#4285f4 40px, transparent 0);
            background-position: 0 -40px;
          }
        }

        @keyframes spinx {
          0%, 49% {
            transform: rotate(0deg);
            background-position: 50% 36px;
          }
          51%, 98% {
            transform: rotate(180deg);
            background-position: 50% 4px;
          }
          100% {
            transform: rotate(360deg);
            background-position: 50% 36px;
          }
        }

        .loading-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .loading-text {
          margin-top: 2rem;
          text-align: center;
        }

        .loading-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .loading-subtitle {
          font-size: 1rem;
          color: #6b7280;
        }
      `}</style>

      <div className="loading-container">
        <div className="loader"></div>
        
        <div className="loading-text">
          <h2 className="loading-title">Cargando Métricas</h2>
          <p className="loading-subtitle">
            Analizando datos de rendimiento energético
          </p>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;