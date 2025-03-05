"use client";

import React, { useState } from "react";
import { Slider } from "./ui/slider";
import Image from "next/image";

// Configuración del archivo
const IMAGE_COUNT = 48; // Número total de imágenes
const IMAGE_PATH = "/images/sequence"; // Ruta base de imágenes

const ImageSequencePlayer: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isGrabbing, setIsGrabbing] = useState(false); // Estado de arrastre

  // Maneja el cambio del slider
  const handleSliderChange = (value: number[]) => {
    setCurrentFrame(value[0]); // Actualiza el frame actual
  };

  // Genera el nombre del archivo
  const getImageFileName = (index: number) =>
    `${IMAGE_PATH}/${index.toString().padStart(4, "0")}.jpg`;

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      {/* Imagen actual según el frame */}
      <Image
        src={getImageFileName(currentFrame)}
        fill
        alt={`Frame ${currentFrame}`}
        className="h-screen w-full object-cover"
      />

      {/* Control deslizante */}
      <Slider
        defaultValue={[0]}
        value={[currentFrame]}
        onValueChange={handleSliderChange}
        max={IMAGE_COUNT - 1}
        step={1}
        min={0}
        onPointerDown={() => setIsGrabbing(true)}
        onPointerUp={() => setIsGrabbing(false)}
        className={`absolute bottom-16 mt-4 w-2/5 ${
          isGrabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
      />
    </div>
  );
};

export default ImageSequencePlayer;
