import React from "react";
import { FaNodeJs } from "react-icons/fa";
import { SiReact, SiPython, SiTypescript, SiGooglecloud, SiGooglebigquery } from "react-icons/si";

const icons: Record<string, JSX.Element> = {
  React: <SiReact className="text-sky-500 text-xl" />,
  "Node.js": <FaNodeJs className="text-green-500 text-xl" />,
  Python: <SiPython className="text-blue-600 text-xl" />,
  TypeScript: <SiTypescript className="text-blue-600 text-xl" />,
  GCP: <SiGooglecloud className="text-orange-500 text-xl" />,
  "Big Query": <SiGooglebigquery className="text-blue-500 text-xl" />,
};

const TechMarqueeDouble: React.FC = () => {
  const tools = ["React", "Node.js", "Python", "TypeScript", "GCP", "Big Query"];

  return (
    <div className="bg-white py-16">
      {/* Título */}
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent text-center mb-12">
        Tecnologías & Herramientas
      </h2>

      {/* Contenedor del marquee */}
      <div className="relative w-full overflow-hidden px-32">
        {/* Gradientes de desvanecimiento */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

        {/* Contenedor de animación */}
        <div className="flex whitespace-nowrap animate-marquee-smooth hover:pause-animation">
          {/* Primera serie de herramientas */}
          <div className="flex items-center">
            {tools.map((tool, index) => (
              <div
                key={`first-${index}`}
                className="mx-6 px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-2xl text-gray-800 text-base font-semibold transition-all duration-300 flex items-center gap-3 min-w-max group hover:scale-105 hover:bg-white/30 hover:border-white/60"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {icons[tool]}
                </span>
                <span className="group-hover:text-blue-600 transition-colors duration-300">
                  {tool}
                </span>
              </div>
            ))}
          </div>

          {/* Segunda serie de herramientas (para seamless loop) */}
          <div className="flex items-center">
            {tools.map((tool, index) => (
              <div
                key={`second-${index}`}
                className="mx-6 px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-2xl text-gray-800 text-base font-semibold transition-all duration-300 flex items-center gap-3 min-w-max group hover:scale-105 hover:bg-white/30 hover:border-white/60"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {icons[tool]}
                </span>
                <span className="group-hover:text-blue-600 transition-colors duration-300">
                  {tool}
                </span>
              </div>
            ))}
          </div>

          {/* Tercera serie de herramientas (para extra smoothness) */}
          <div className="flex items-center">
            {tools.map((tool, index) => (
              <div
                key={`third-${index}`}
                className="mx-6 px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-2xl text-gray-800 text-base font-semibold transition-all duration-300 flex items-center gap-3 min-w-max group hover:scale-105 hover:bg-white/30 hover:border-white/60"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {icons[tool]}
                </span>
                <span className="group-hover:text-blue-600 transition-colors duration-300">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee-smooth {
          animation: marquee-smooth 25s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TechMarqueeDouble;