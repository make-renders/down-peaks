"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bike,
  Camera,
  Car,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  GraduationCap,
  Hospital,
  Plane,
  TramFront,
  TreePine,
  Trophy,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
interface Apartment {
  id: string;
  number: string;
  cx?: string;
  cy?: string;
  path?: string;
  //pathIcon?: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  subtitleIcon?: React.ReactNode;
  distance: string;
}

const buildingViews: {
  video: string;
  videoReverse?: string;
  apartments: Apartment[];
}[] = [
  {
    video: "/videos/barrio/an-vecindario-1.mp4",
    videoReverse: "/videos/barrio/an-vecindario-1-r.mp4",
    apartments: [
      {
        id: "trophy",
        number: "101",
        cx: "449",
        cy: "395",
        path: "M474.07,405.63l-22.66,46.96c-.94,1.95-3.72,1.95-4.66,0l-22.66-47.06c-3.66-7.6-3.53-16.55.61-23.89,3.93-6.96,11.14-13.64,24.38-13.64s20.5,6.75,24.42,13.77c4.11,7.35,4.23,16.28.57,23.87Z",
        icon: <Trophy size={20} />,
        title: "Estadio Ciudad de Vicente Lopez",
        subtitle: "10 min",
        subtitleIcon: <Bike size={18} />,
        distance: " 2,8 km",
      },
      {
        id: "tram-front",
        number: "101",
        cx: "1491",
        cy: "525",
        path: "M1516.07,535.63l-22.66,46.96c-.94,1.95-3.72,1.95-4.66,0l-22.66-47.06c-3.66-7.6-3.53-16.55.61-23.89,3.93-6.96,11.14-13.64,24.38-13.64s20.5,6.75,24.42,13.77c4.11,7.35,4.23,16.28.57,23.87Z",
        icon: <TramFront size={20} />,
        title: "Estación Nuñez",
        subtitle: "5 min",
        subtitleIcon: <Bike size={18} />,
        distance: "1,1 km",
      },
    ],
  },
  {
    video: "/videos/barrio/an-vecindario-2.mp4",
    videoReverse: "/videos/barrio/an-vecindario-2-r.mp4",
    apartments: [
      {
        id: "camera",
        number: "101",
        cx: "205",
        cy: "402",
        path: "M230.07,412.63l-22.66,46.96c-.94,1.95-3.72,1.95-4.66,0l-22.66-47.06c-3.66-7.6-3.53-16.55.61-23.89,3.93-6.96,11.14-13.64,24.38-13.64s20.5,6.75,24.42,13.77c4.11,7.35,4.23,16.28.57,23.87Z",
        icon: <Camera size={20} />,
        title: "Buenos Aires Playa",
        subtitle: "25 min",
        subtitleIcon: <Bike size={18} />,
        distance: "4 km",
      },
      {
        id: "graduation-cap",
        number: "101",
        cx: "1249",
        cy: "393",
        path: "M1274.07,403.63l-22.66,46.96c-.94,1.95-3.72,1.95-4.66,0l-22.66-47.06c-3.66-7.6-3.53-16.55.61-23.89,3.93-6.96,11.14-13.64,24.38-13.64s20.5,6.75,24.42,13.77c4.11,7.35,4.23,16.28.57,23.87Z",
        icon: <GraduationCap size={20} />,
        title: "Escuela del Jacaranda",
        subtitle: "2 min",
        subtitleIcon: <Footprints size={18} />,
        distance: "120 metros",
      },
      {
        id: "plane",
        number: "101",
        cx: "1744",
        cy: "350",
        path: "M1769.07,360.63l-22.66,46.96c-.94,1.95-3.72,1.95-4.66,0l-22.66-47.06c-3.66-7.6-3.53-16.55.61-23.89,3.93-6.96,11.14-13.64,24.38-13.64s20.5,6.75,24.42,13.77c4.11,7.35,4.23,16.28.57,23.87Z",
        icon: <Plane size={20} />,
        title: "Aeropuerto Internacional Jorge Newbery",
        subtitle: "16 min",
        subtitleIcon: <Car size={18} />,
        distance: "6.9 km",
      },
    ],
  },
  {
    video: "/videos/barrio/an-vecindario-3.mp4",
    videoReverse: "/videos/barrio/an-vecindario-3-r.mp4",
    apartments: [
      {
        id: "hospital",
        number: "101",
        cx: "411",
        cy: "395",
        path: "M436.07,405.63l-22.66,46.96c-.94,1.95-3.72,1.95-4.66,0l-22.66-47.06c-3.66-7.6-3.53-16.55.61-23.89,3.93-6.96,11.14-13.64,24.38-13.64s20.5,6.75,24.42,13.77c4.11,7.35,4.23,16.28.57,23.87Z",
        icon: <Hospital size={20} />,
        title: "Hospital Pirobano",
        subtitle: "10 min",
        subtitleIcon: <Car size={18} />,
        distance: "2.7 km",
      },
      {
        id: "tree-pine",
        number: "101",
        cx: "1284",
        cy: "316",
        path: "M1309.07,326.63l-22.66,46.96c-.94,1.95-3.72,1.95-4.66,0l-22.66-47.06c-3.66-7.6-3.53-16.55.61-23.89,3.93-6.96,11.14-13.64,24.38-13.64s20.5,6.75,24.42,13.77c4.11,7.35,4.23,16.28.57,23.87Z",
        icon: <TreePine size={20} />,
        title: "Plaza alberdi",
        subtitle: "21 min",
        subtitleIcon: <Bike size={18} />,
        distance: "3.4 km",
      },
    ],
  },
];

const videoInitial = "/videos/barrio/an-vecindario-inicio.mp4";

export default function BuildingViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Estado adicional: cuál ruta de video (normal o reverse) se está reproduciendo
  const [currentSrc, setCurrentSrc] = useState(buildingViews[0].video);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Cuando cambie `currentSrc`, asignamos ese video y lo reproducimos
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    setIsPlaying(true);
    video.pause();
    video.src = currentSrc;
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .catch((err) => {
          console.error("Autoplay blocked or play error:", err);
          setIsPlaying(false);
        })
        .then(() => {
          // si no hubo error, ya se está reproduciendo
        });
    }

    const onEnded = () => {
      setIsPlaying(false);
    };
    video.addEventListener("ended", onEnded);

    // cleanup
    return () => {
      video.removeEventListener("ended", onEnded);
    };
  }, [currentSrc]);

  // Botones de navegación
  const handleNavigation = (direction: "next" | "prev") => {
    if (isPlaying) return; // evita spam
    const isNext = direction === "next";

    // Calculamos el nuevo índice
    const newIndex = isNext
      ? (currentIndex + 1) % buildingViews.length
      : (currentIndex - 1 + buildingViews.length) % buildingViews.length;

    // Si es next -> normal, si es prev -> reverse
    const newSrc = isNext
      ? buildingViews[newIndex].video
      : buildingViews[newIndex].videoReverse || buildingViews[newIndex].video;

    setCurrentIndex(newIndex);
    setCurrentSrc(newSrc);
  };
  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden">
      <div className="relative h-full w-full">
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            autoPlay
          />

          <TooltipProvider>
            <motion.svg
              key={currentIndex}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1920 1080"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.4, ease: "easeInOut" }}
            >
              <g id="vecindario">
                {buildingViews[currentIndex]?.apartments.map((apt) => (
                  <Tooltip key={apt.id} delayDuration={150}>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <motion.g
                        initial={{ scale: 0 }}
                        animate={{ scale: [0.6, 1.3, 1] }}
                        transition={{
                          delay: 2.1,
                          duration: 1, // Duración de la animación
                          ease: "easeOut", // Efecto de salida suave
                        }}
                      >
                        <g id={apt.id}>
                          <path
                            id="gota"
                            data-name="gota"
                            d={apt.path}
                            className="fill-background/45 stroke-transparent hover:fill-background/65"
                            strokeWidth="1"
                          />
                          {/* Circle */}
                          <circle
                            id={apt.id}
                            cx={apt.cx}
                            cy={apt.cy}
                            r="20"
                            className="fill-background/80 stroke-transparent"
                            strokeWidth="1"
                          />
                        </g>
                        {/* Icon */}
                        <g
                          transform={`translate(${Number(apt.cx) - 10}, ${Number(apt.cy) - 10})`}
                          className=""
                        >
                          {apt.icon}
                        </g>
                      </motion.g>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="animate-blurred-fade-in bg-transparent animate-duration-500"
                    >
                      <Card className="">
                        <CardHeader>
                          <CardTitle className="text-base">
                            {apt.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <p>{apt.subtitleIcon}</p>
                            <p>{apt.subtitle}</p>
                          </div>
                          <p>Distancia {apt.distance}</p>
                        </CardContent>
                      </Card>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </g>
            </motion.svg>
          </TooltipProvider>
        </div>
      </div>

      <div className="absolute left-0 top-1/2 z-50 -translate-y-1/2 transform pl-6">
        <Button
          size="icon"
          className={cn(
            "border-none bg-foreground/25 font-bold text-foreground shadow-none hover:bg-primary/65",
            isPlaying && "pointer-events-none cursor-not-allowed opacity-50",
          )}
          onClick={() => handleNavigation("prev")}
          disabled={isPlaying}
          aria-label="Vista anterior"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute right-0 top-1/2 z-50 -translate-y-1/2 transform pr-6">
        <Button
          size="icon"
          className={cn(
            "border-none bg-foreground/25 font-bold text-foreground shadow-none hover:bg-primary/65",
            isPlaying && "pointer-events-none cursor-not-allowed opacity-50",
          )}
          onClick={() => handleNavigation("next")}
          disabled={isPlaying}
          aria-label="Siguiente vista"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
