import React from "react";
import { motion } from "framer-motion";

export const SvgEffect = () => {
  return (
    <div className="">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="blue"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="500"
            strokeDashoffset="500"
            animate={{
              strokeDashoffset: [500, 0, -500], // Mismo sentido siempre
            }}
            transition={{
              duration: 3, // Duración total
              ease: "easeInOut", // Animación suave
              repeat: Infinity, // Repetir indefinidamente
            }}
          />
        </svg>

        {/* Círculo con animación glow*/}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="glowing-svg"
        >
          {/* Definición del filtro de glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Círculo con efecto de glow */}
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="cyan"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            className="circle"
          />
        </svg>
      </div>
    </div>
  );
};
