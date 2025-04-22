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
                        strokeWidth: "2px",
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
  "1": { cx: 282.24, cy: 704.56 },
  "2": { cx: 355.38, cy: 755.04 },
  "3": { cx: 404.71, cy: 787.61 },
  "4": { cx: 463.76, cy: 835.61 },
  "5": { cx: 535.76, cy: 799.8 },
  "6": { cx: 604.42, cy: 773.96 },
  "7": { cx: 664.23, cy: 748.25 },
  "8": { cx: 711.66, cy: 716.25 },
  "9": { cx: 745.05, cy: 679.68 },
  "10": { cx: 780.9, cy: 637.84 },
  "11": { cx: 809.95, cy: 597.73 },
  "12": { cx: 875.66, cy: 533.93 },
  "13": { cx: 805.38, cy: 494.5 },
  "14": { cx: 894.71, cy: 465.54 },
  "15": { cx: 961.38, cy: 508.4 },
  "16": { cx: 1070.71, cy: 498.31 },
  "17": { cx: 1186.71, cy: 502.98 },
  "18": { cx: 1282.45, cy: 432.12 },
  "19": { cx: 1409.95, cy: 367.61 },
  "20": { cx: 1466.33, cy: 351.1 },
  "21": { cx: 1529.31, cy: 354.15 },
  "22": { cx: 1613.88, cy: 411.29 },
  "23": { cx: 1185.21, cy: 445.83 },
  "24": { cx: 1087.18, cy: 442.79 },
  "25": { cx: 999.05, cy: 439.64 },
  "26": { cx: 984, cy: 389.76 },
  "27": { cx: 976.48, cy: 333.89 },
  "28": { cx: 999.05, cy: 278.52 },
  "29": { cx: 1114.86, cy: 202.9 },
  "30": { cx: 1040.54, cy: 169.63 },
  "31": { cx: 1079.91, cy: 143.48 },
  "32": { cx: 1153.81, cy: 177.16 },
  "33": { cx: 1298.83, cy: 239.54 },
  "34": { cx: 1127.15, cy: 116.05 },
  "35": { cx: 1216.04, cy: 148.3 },
  "36": { cx: 1263.02, cy: 192.21 },
  "37": { cx: 1185.56, cy: 99.79 },
  "38": { cx: 1300.35, cy: 133.25 },
  "39": { cx: 1327.78, cy: 177.16 },
  "40": { cx: 1362.83, cy: 227.29 },
  "41": { cx: 1066.35, cy: 297.67 },
  "42": { cx: 1171.66, cy: 234.81 },
  "43": { cx: 1238.96, cy: 267.06 },
  "44": { cx: 1048.07, cy: 331.54 },
  "45": { cx: 1068.13, cy: 369.89 },
  "46": { cx: 1116.39, cy: 391.73 },
  "47": { cx: 1179.18, cy: 396.3 },
  "48": { cx: 1238.36, cy: 388.78 },
  "49": { cx: 897.57, cy: 627.83 },
  "50": { cx: 788.42, cy: 749.2 },
  "51": { cx: 824.99, cy: 708.72 },
  "52": { cx: 863.09, cy: 666.25 },
  "53": { cx: 742.33, cy: 786.91 },
  "54": { cx: 604.42, cy: 840.51 },
  "55": { cx: 675.28, cy: 814.98 },
  "56": { cx: 534.36, cy: 735.16 },
  "57": { cx: 613.6, cy: 692.24 },
  "58": { cx: 658.93, cy: 651.99 },
  "59": { cx: 692.46, cy: 605.26 },
  "60": { cx: 726.87, cy: 562.21 },
  "61": { cx: 533.09, cy: 879.42 },
  "62": { cx: 402.24, cy: 717.32 },
  "63": { cx: 432.52, cy: 674.08 },
  "64": { cx: 469.09, cy: 620.05 },
  "65": { cx: 518.04, cy: 577.77 },
  "66": { cx: 480.08, cy: 514.72 },
  "67": { cx: 572.9, cy: 542.62 },
  "68": { cx: 557.85, cy: 480.52 },
  "69": { cx: 590.43, cy: 439.76 },
  "70": { cx: 678.81, cy: 463.57 },
  "71": { cx: 714.24, cy: 429.76 },
  "72": { cx: 758.11, cy: 389.76 },
  "73": { cx: 812.77, cy: 364.33 },
  "74": { cx: 622.24, cy: 403 },
  "75": { cx: 656.52, cy: 364.33 },
  "76": { cx: 697.66, cy: 333.86 },
  "77": { cx: 758.11, cy: 305.92 },
  "78": { cx: 823, cy: 297.67 },
  "79": { cx: 879.5, cy: 353.41 },
  "80": { cx: 888.77, cy: 295.89 },
  "81": { cx: 628.9, cy: 521.1 },
  "82": { cx: 324.52, cy: 649.58 },
  "83": { cx: 367.19, cy: 605 },
  "84": { cx: 412.24, cy: 557.67 },
};
