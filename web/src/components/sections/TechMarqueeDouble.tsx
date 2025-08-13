import React from "react";
import "./marquee.css";

import { FaNodeJs } from "react-icons/fa";
import { SiReact, SiPython, SiTypescript, SiGooglecloud, SiGooglebigquery } from "react-icons/si";

const icons: Record<string, JSX.Element> = {
  React: <SiReact className="text-sky-400 text-lg" />,
  "Node.js": <FaNodeJs className="text-green-600 text-lg" />,
  Python: <SiPython className="text-blue-500 text-lg" />,
  TypeScript: <SiTypescript className="text-blue-500 text-lg" />,
  GCP: <SiGooglecloud className="text-yellow-400 text-lg" />,
  "Big Query": <SiGooglebigquery className="text-blue-400 text-lg" />,
};

const TechMarqueeDouble: React.FC = () => {
  const tools = ["React", "Node.js", "Python", "TypeScript", "GCP", "Big Query"];
  const loopedTools = [...tools, ...tools];

  return (
    <div className="bg-white py-8">
      {/* Título */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
        Herramientas
      </h2>

      {/* Contenedor centrado */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="w-full overflow-hidden flex justify-center items-center relative bg-white rounded-lg">
          {/* Filtro difuminado izquierda */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Filtro difuminado derecha */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Lista de herramientas animada */}
          <div className="inline-flex animate-marquee">
            {loopedTools.map((tool, index) => (
              <span
                key={index}
                className="mx-4 px-4 py-2 bg-white border border-gray-300 rounded-full text-black text-sm font-medium shadow-md flex items-center gap-2"
              >
                {icons[tool]}
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechMarqueeDouble;
