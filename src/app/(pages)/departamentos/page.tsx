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

import VideoTransitionImage from "@/components/video-components/video-transition-image";

export default function Page() {
  const selectedUnit = useUnitsByIdStore((state) => state.selectedUnit);

  const isMobile = useIsMobile();

  const videoIndex = "/videos/home/an-index.mp4";
  //const imageBgIndex = "/images/bg-image/index.jpg";
  const videoIndexMobile = "/videos/home/an-index-vertical.mp4";
  //const imageBgIndexMobile = "/images/bg-image/index-vertical.png";

  const visible = useUnitsSelectionVisibleStore((state) => state.visible);

  const filteredUnits = useUnitsStore(
    useShallow((state) => state.filteredUnitsData),
  );

  return (
    <main className="h-screen w-full">
      <div className="relative flex h-dvh w-full flex-col items-center justify-center">
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-neutral-800 opacity-60 md:hidden"></div>

        {isMobile ? (
          <>
            <Suspense>
              <VideoTransitionImage video={videoIndexMobile} />
            </Suspense>
            <section className="absolute z-10 flex w-full flex-col items-center justify-center px-3">
              <MainUnitsDrawer />
            </section>
          </>
        ) : (
          <>
            <Suspense>
              <VideoTransitionImage
                video={videoIndex} /* image={imageBgIndex} */
              />
            </Suspense>
            <section className="absolute top-5 z-10 flex h-[740px] w-full max-w-[1440px] flex-col justify-end p-3">
              <MainSidebar />
            </section>
            <section className="absolute -top-1 flex h-[740px] w-full max-w-[1440px] justify-end p-3">
              <div
                className={cn(
                  "flex justify-end pl-3 md:w-[67%] lg:w-[75%] lg:pl-5 xl:w-[79%]",
                  selectedUnit === null ? "-z-50" : "z-50",
                )}
              >
                {selectedUnit === null ? "" : <UnitsKuulaId />}
              </div>
            </section>
          </>
        )}

        {/* SVG Section */}
        <svg
          id="Capa_4"
          data-name="Capa 4"
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full animate-blurred-fade-in animate-duration-400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter
              id="neon-filter-internal"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              filterUnits="userSpaceOnUse"
            >
              {/* Inner Glow */}
              <feFlood
                floodColor="#ffffff"
                floodOpacity="1"
                result="baseColor"
              />
              <feComposite in="baseColor" in2="SourceGraphic" operator="in" />
              <feGaussianBlur stdDeviation="3" result="innerGlow" />

              {/* Mid Glow */}
              <feFlood
                floodColor="#ff8740"
                floodOpacity="0.8"
                result="midColor"
              />
              <feComposite in="midColor" in2="SourceGraphic" operator="in" />
              <feGaussianBlur stdDeviation="1" result="midGlow" />

              {/* Outer Glow */}
              <feFlood
                floodColor="#ff4c00"
                floodOpacity="0.6"
                result="outerColor"
              />
              <feComposite in="outerColor" in2="SourceGraphic" operator="in" />
              <feGaussianBlur stdDeviation="3" result="outerGlow" />

              {/* Merge glows internally */}
              <feMerge>
                <feMergeNode in="outerGlow" />
                <feMergeNode in="midGlow" />
                <feMergeNode in="innerGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect
            id="rectangulo"
            width="1920"
            height="1080"
            style={{ fill: "none" }}
          />
          {filteredUnits.map(
            (unit, index) =>
              visible === index && (
                <path
                  key={unit.id}
                  id={unit.id.toString()}
                  data-name={`${index + 1}`}
                  d={svgPathData[unit.id]}
                  style={{
                    fill: "none",
                    filter: "url(#neon-filter-internal)",
                    stroke: "#fff",
                    strokeMiterlimit: 10,
                    strokeWidth: "4px",
                    strokeOpacity: 1, // Asegúrate de que comience invisible
                    animation: "fadeIn .5s ease-in-out forwards", // Añade la animación
                  }}
                />
              ),
          )}
        </svg>
      </div>
    </main>
  );
}

const svgPathData: { [key: string]: string } = {
  "2": "M1186,766.92v71.24c0,3.37-3.2,5.82-6.45,4.94l-93.76-25.25c-2.24-.6-3.79-2.63-3.79-4.94v-61.59c0-3.16,2.84-5.57,5.96-5.05l93.76,15.61c2.47.41,4.28,2.55,4.28,5.05Z",
  "3": "M1280,782.4v81.32c0,3.25-3.08,5.61-6.22,4.76l-84.13-22.66c-2.15-.58-3.65-2.53-3.65-4.76v-72.66c0-3.05,2.74-5.37,5.74-4.87l84.13,14c2.38.4,4.12,2.45,4.12,4.87Z",
  "4": "M1687.29,751.71v54.19c0,1.88-1.05,3.61-2.74,4.47-.01.01-.03.01-.04.02l-217.8,108.76s-.03.02-.05.02c-1.09.53-2.33.65-3.5.33l-179.45-48.34h-.01c-2.18-.6-3.7-2.58-3.7-4.84v-82.18c0-3.1,2.78-5.46,5.84-4.95l178.03,29.62c.65.11,1.32.09,1.97-.06.08-.01.17-.04.25-.06l214.8-61.8c3.2-.92,6.4,1.49,6.4,4.82Z",
  "5": "M1082,687.52v51.45c0,3.3-2.96,5.81-6.22,5.27l-94.32-15.69c-2.58-.43-4.46-2.66-4.46-5.27v-45.71c0-3.17,2.75-5.64,5.9-5.31l94.32,9.95c2.72.29,4.78,2.58,4.78,5.31Z",
  "6": "M1186,697.86v59.26c0,2.86-2.57,5.04-5.39,4.57l-94.74-15.77c-2.23-.37-3.87-2.3-3.87-4.57v-53.49c0-2.75,2.38-4.89,5.12-4.61l94.74,10c2.36.25,4.14,2.24,4.14,4.61Z",
  "7": "M1280,708.16v64.1c0,3.12-2.8,5.5-5.88,4.98l-83.89-13.96c-2.44-.41-4.22-2.51-4.22-4.98v-58.99c0-3,2.6-5.34,5.58-5.03l83.89,8.85c2.57.27,4.52,2.44,4.52,5.03Z",
  "8": "M1687.29,693.28v47.96c0,2.25-1.49,4.24-3.67,4.86l-2.73.79-214.79,61.79s-.09.03-.14.04c-.04.01-.09.02-.13.03-.14.04-.28.06-.42.08-.08.01-.15.02-.22.02-.16.02-.33.03-.49.03-.28,0-.56-.02-.83-.07l-178.03-29.62-1.61-.27c-2.44-.4-4.23-2.52-4.23-4.99v-64.69c0-2.99,2.57-5.32,5.54-5.04l178.79,18.87c.44.05.89.03,1.34-.04l215.75-34.75c3.08-.5,5.87,1.88,5.87,5Z",
  "10": "M1082,626v50.19c0,3.49-3.02,6.2-6.49,5.84l-93.26-9.84c-2.99-.32-5.25-2.83-5.25-5.84v-42.52c0-3.3,2.71-5.95,6.01-5.87l93.26,2.17c3.19.07,5.73,2.68,5.73,5.87Z",
  "11": "M1186,629.57v56.29c0,4.19-3.63,7.45-7.79,7.01l-89.9-9.49c-3.59-.38-6.31-3.4-6.31-7.01v-48.89c0-3.96,3.26-7.14,7.21-7.05l89.9,2.09c3.83.09,6.88,3.22,6.88,7.05Z",
  "12": "M1280,629.73v68.34c0,2.96-2.56,5.26-5.5,4.95l-84.04-8.87c-2.53-.27-4.46-2.4-4.46-4.95v-61.43c0-2.8,2.3-5.04,5.09-4.98l84.04,1.96c2.7.06,4.86,2.27,4.86,4.98Z",
  "13": "M1687.29,631.81v51.21c0,2.49-1.8,4.6-4.25,4.99l-217.37,35.02c-.45.07-.9.09-1.34.04l-178.79-18.87-1.01-.11c-2.58-.27-4.53-2.44-4.53-5.03v-69.01c0-2.84,2.34-5.13,5.17-5.06l179.83,4.18,217.3-2.41c2.75.03,4.99,2.28,4.99,5.05Z",
  "15": "M1082,563.66v49.12c0,4.1-3.38,7.4-7.48,7.31l-90.38-2.1c-3.97-.09-7.14-3.34-7.14-7.31v-42.54c0-3.9,3.06-7.11,6.95-7.3l18.05-.9,72.33-3.58c4.17-.21,7.67,3.12,7.67,7.3Z",
  "16": "M1186,557.07v59.53c0,3.34-2.74,6.02-6.08,5.94l-92.12-2.14c-3.23-.08-5.8-2.71-5.8-5.94v-52.82c0-3.17,2.48-5.78,5.65-5.93l34.35-1.7,57.77-2.86c3.39-.17,6.23,2.54,6.23,5.93Z",
  "17": "M1280,554.79v61.68c0,4.61-3.79,8.31-8.4,8.2l-77.59-1.81c-4.46-.1-8.02-3.75-8.02-8.2v-56.02c0-4.37,3.43-7.98,7.8-8.2l77.59-3.85c4.69-.23,8.61,3.5,8.61,8.2Z",
  "18": "M1687.29,561.11v60.6c0,2.76-2.23,5.01-4.99,5.05l-217.3,2.41-179.83-4.18h-.24c-2.74-.07-4.93-2.31-4.93-5.05v-68.96c0-2.5,1.81-4.58,4.21-4.98.2-.04.39-.06.59-.07l169.22-8.38c.69-.03,1.36-.07,1.99-.1l1.8-.09c2.85-.15,4.9-.25,5.97-.3l.67-.03h.2c.23-.02.47-.02.7,0l215.42,18.88,1,.09.91.08c2.61.22,4.61,2.41,4.61,5.03Z",
  "20": "M1122,491.23v57.39c0,3.02-2.37,5.5-5.38,5.65l-34.62,1.71-74.06,3.67c-3.23.16-5.94-2.42-5.94-5.65v-51.21c0-2.89,2.18-5.32,5.06-5.63l108.69-11.56c3.34-.36,6.25,2.26,6.25,5.63Z",
  "21": "M1280,475.02v65.28c0,3.29-2.58,6-5.87,6.17l-88.13,4.37-57.52,2.85c-3.53.17-6.48-2.64-6.48-6.17v-57.02c0-3.16,2.38-5.81,5.52-6.14l145.65-15.48c3.65-.39,6.83,2.47,6.83,6.14Z",
  "22": "M1687.29,496.08v54.86c0,2.98-2.55,5.32-5.52,5.06l-1-.09-215.77-18.86c-.17-.01-.34-.02-.51-.02h-.18c-.14.01-.31.02-.53.03-.13,0-.28.01-.45.02-.08,0-.17.01-.26.01-.16.01-.33.02-.51.03h-.07c-.83.05-1.89.1-3.16.16-.32.01-.65.03-.99.05-.17.01-.35.02-.53.03l-1.8.09c-.63.04-1.3.07-1.99.1l-2.17.11c-.58.03-1.18.06-1.8.09-38.9,1.97-143.56,7.24-165.84,8.25-2.72.12-4.21.19-4.21.17v-73.45c0-2.6,1.96-4.78,4.54-5.05l1.48-.16,178.17-18.94h.05c.35-.04.7-.05,1.05-.01.17.02.34.05.51.08l215,41.99,2.39.47c2.38.46,4.1,2.55,4.1,4.98Z",
  "24": "M1122,425.36v53.46c0,3.48-2.63,6.4-6.09,6.77l-106.39,11.31c-4.02.43-7.53-2.72-7.53-6.77v-42.64c0-3.23,2.26-6.01,5.42-6.66l106.39-22.13c4.23-.88,8.19,2.35,8.19,6.66Z",
  "25": "M1280,389.97v73.9c0,2.44-1.84,4.48-4.26,4.74l-148.47,15.78c-2.81.3-5.27-1.91-5.27-4.74v-58.78c0-2.26,1.58-4.2,3.79-4.66l60.21-12.53,88.26-18.37c2.96-.62,5.74,1.64,5.74,4.66Z",
  "26": "M1687.29,428.88v56.41c0,3.43-3.12,6-6.49,5.34l-215-41.99c-.17-.04-.34-.06-.51-.08-.36-.03-.73-.03-1.1.01l-178.17,18.94c-3.22.34-6.02-2.18-6.02-5.41v-73.56c0-2.58,1.81-4.81,4.33-5.33l179.17-37.28h.03c.97-.2,1.98-.13,2.91.21l217.24,77.62c2.16.77,3.61,2.83,3.61,5.12Z",
  "28": "M1186,360.27v37.97c0,3.16-2.22,5.89-5.32,6.54l-58.68,12.21-111.96,23.29c-4.15.86-8.04-2.3-8.04-6.54v-32.4c0-3.09,2.11-5.77,5.11-6.49l6.6-1.59h0l164.04-39.48c4.2-1.01,8.24,2.17,8.24,6.49Z",
  "29": "M1280,375.9v-41.37c0-3.14,2.15-5.87,5.21-6.59l177.65-42.27c1.39-.33,2.85-.21,4.17.34l216.09,89.92c2.53,1.05,4.17,3.52,4.17,6.26v34.18c0,4.69-4.66,7.97-9.07,6.37l-211.45-76.25c-1.18-.42-2.45-.51-3.68-.26l-174.94,36.31c-4.21.87-8.15-2.34-8.15-6.63Z",
  "31": "M1687.29,291.48v71.98c0,6.03-5.48,10.34-11.09,9.37-.68-.12-1.37-.32-2.05-.6-.01,0-.01-.01-.02-.01l-206.26-86.37-.05-.02c-.91-.37-1.86-.6-2.82-.68-1.01-.09-2.03,0-3.02.23l-181.98,43.79-8.84,2.13-79.67,19.18-5.49,1.32-172.28,41.46h0c-5.98,1.43-11.71-3.09-11.71-9.23v-58.98c0-3.99,2.49-7.55,6.24-8.92l452.44-165.14c2.73-1,5.76-.69,8.23.83l213.86,131.57c2.81,1.73,4.52,4.79,4.52,8.09Z",
};
