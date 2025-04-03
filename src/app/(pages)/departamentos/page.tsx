"use client";

import { Suspense } from "react";

import { useShallow } from "zustand/react/shallow";
import { useUnitsByIdStore } from "@/stores/units-by-id.store";
import { useUnitsSelectionVisibleStore } from "@/stores/units-selection-visible.store";
import { useUnitsStore } from "@/stores/units.store";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import { MainSidebar } from "@/components/sidebar-units/main-sidebar";
import { MainUnitsDrawer } from "@/components/drawer-units/main-units-drawer";

import { UnitsKuulaId } from "@/components/units-kuula-id";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import VideoTransitionImage from "@/components/video-components/video-transition-image";

export default function Page() {
  const selectedUnit = useUnitsByIdStore((state) => state.selectedUnit);

  const isMobile = useIsMobile();

  const videoIndex = "/videos/home/an-index.mp4";
  const imageBgIndex = "/images/bg-image/index.jpg";
  const videoIndexMobile = "/videos/home/an-index-vertical.mp4";
  //const imageBgIndexMobile = "/images/bg-image/index-vertical.png";

  const filteredUnits = useUnitsStore(
    useShallow((state) => state.filteredUnitsData),
  );

  const visibleUnit = useUnitsSelectionVisibleStore((state) => state.visible);

  return (
    <main className="h-screen w-full">
      <div className="relative flex h-dvh w-full flex-col items-center justify-center">
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-neutral-800 opacity-60 md:hidden"></div>

        {isMobile ? (
          <>
            {/* <Suspense>
              <VideoTransitionImage video={videoIndexMobile} />
            </Suspense> */}
            <section className="absolute z-10 flex w-full flex-col items-center justify-center px-3">
              <MainUnitsDrawer />
            </section>
          </>
        ) : (
          <>
            <Suspense>
              <VideoTransitionImage video={videoIndex} image={imageBgIndex} />
            </Suspense>
            <section className="absolute left-5 top-5 z-50 flex h-[740px] w-auto max-w-[1440px] flex-col justify-end p-3">
              <MainSidebar />
            </section>
            {/* Units Kuula ID */}
            {selectedUnit && (
              <section className="absolute -top-1 flex h-[740px] w-full max-w-[1440px] justify-end p-3">
                <div className="flex justify-end pl-3 md:w-[67%] lg:w-[75%] lg:pl-5 xl:w-[79%]">
                  <UnitsKuulaId />
                </div>
              </section>
            )}

            {/* <section className="absolute -top-1 flex h-[740px] w-full max-w-[1440px] justify-end p-3">
              <div
                className={cn(
                  "flex justify-end pl-3 md:w-[67%] lg:w-[75%] lg:pl-5 xl:w-[79%]",
                  selectedUnit === null ? "-z-50" : "z-50",
                )}
              >
                {selectedUnit === null ? "" : <UnitsKuulaId />}
              </div>
            </section> */}
          </>
        )}

        {/* SVG Section */}
        <TooltipProvider>
          <svg
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full animate-blurred-fade-in animate-delay-300 animate-duration-400"
          >
            <defs>
              <filter
                id="neon-filter-simplified"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodColor="#F0F2FF" result="flood" />
                <feComposite
                  in="flood"
                  in2="SourceGraphic"
                  operator="in"
                  result="coloredSource"
                />
                <feGaussianBlur
                  in="coloredSource"
                  stdDeviation="4"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* se puede borrar, parece no hacer nada */}
            <rect
              id="rectangulo"
              width="1920"
              height="1080"
              style={{ fill: "none" }}
            />
            {filteredUnits.map((unit, index) => {
              const pos = svgCirclePositions[unit.id];
              if (!pos) return null;
              const isHovered = visibleUnit === unit.id;

              return (
                <Tooltip key={unit.id} delayDuration={150}>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <circle
                      key={unit.id}
                      id={unit.id.toString()}
                      data-name={`${index + 1}`}
                      cx={pos.cx}
                      cy={pos.cy}
                      r={10.67}
                      style={{
                        fill: isHovered ? "#fff" : "#131540",
                        filter: "url(#neon-filter-simplified)",
                        stroke: isHovered ? "#131540" : "#fff",
                        strokeMiterlimit: 10,
                        strokeWidth: "3px",
                        strokeOpacity: 1,
                        animation: "fadeIn .5s ease-in-out forwards",
                      }}
                    />
                  </TooltipTrigger>

                  <TooltipContent
                    side="right"
                    className="animate-blurred-fade-in bg-transparent animate-duration-500"
                  >
                    <Card className="">
                      <CardHeader>
                        <CardTitle className="text-base">{unit.id}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <p>{unit.precio}</p>
                          <p>{unit.tipologia}</p>
                        </div>
                        <p>Distancia {unit.piso}</p>
                      </CardContent>
                    </Card>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </svg>
        </TooltipProvider>
      </div>
    </main>
  );
}

const svgCirclePositions: { [key: string]: { cx: number; cy: number } } = {
  "1": { cx: 930.44, cy: 598.95 },
  "2": { cx: 722.44, cy: 784.95 },
  "3": { cx: 1563.44, cy: 804.95 },
  "4": { cx: 778.44, cy: 877.95 },
  "5": { cx: 448.44, cy: 637.95 },
  "6": { cx: 1471.44, cy: 936.95 },
  "7": { cx: 659.65, cy: 722.98 },
  "8": { cx: 1824.65, cy: 557.98 },
  "9": { cx: 124.65, cy: 1020.98 },
};
