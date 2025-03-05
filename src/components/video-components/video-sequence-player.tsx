"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Bike,
  Camera,
  Car,
  ChevronLeft,
  ChevronRight,
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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const totalVideos = 3;

interface NearPoints {
  id: string;
  number: string;
  cx?: string;
  cy?: string;
  path?: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  subtitleIcon?: React.ReactNode;
  distance: string;
}

const nearPointsViews: {
  nearPoint: NearPoints[];
}[] = [
  {
    nearPoint: [
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
    nearPoint: [
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
    nearPoint: [
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

export default function VideoSequencePlayer() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isForward, setIsForward] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((e) => {
        console.error("Error playing video:", e);
        setError("Error al reproducir el video. Por favor, intente de nuevo.");
      });
    }
  }, [videoRef]);

  const handleNext = () => {
    if (isForward) {
      setCurrentIndex((prev) => (prev === totalVideos ? 1 : prev + 1));
    } else {
      setIsForward(true);
    }
    setError(null);
  };

  const handlePrev = () => {
    if (!isForward) {
      setCurrentIndex((prev) => (prev === 1 ? totalVideos : prev - 1));
    } else {
      setIsForward(false);
    }
    setError(null);
  };

  const videoSrc = `/videos/barrio/an-vecindario-${currentIndex}_${isForward ? "forward" : "backward"}.mp4`;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative h-full w-full">
        <AnimatePresence>
          <motion.div
            key={videoSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.43, 0.13, 0.23, 0.96],
              /* duration: 0.4,
            ease: "easeInOut", */
            }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              src={videoSrc}
              className="h-full w-full object-cover"
              autoPlay
              playsInline
              muted
            />
          </motion.div>
        </AnimatePresence>

        <TooltipProvider>
          <motion.svg
            key={videoRef.current?.currentTime}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.4, ease: "easeInOut" }}
          >
            <g id="vecindario">
              {nearPointsViews[currentIndex - 1]?.nearPoint.map((apt) => (
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
                        <CardTitle className="text-base">{apt.title}</CardTitle>
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

      {/* botones de navegación */}
      <div className="absolute bottom-14 left-0 right-0 flex animate-pulse justify-center space-x-4 hover:animate-play-paused">
        <Button
          onClick={handlePrev}
          //disabled={currentIndex === 0}
          className="bg-white/50 text-white hover:bg-white/80"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          onClick={handleNext}
          //disabled={currentIndex === totalVideos - 1}
          className="bg-white/50 text-white hover:bg-white/80"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
