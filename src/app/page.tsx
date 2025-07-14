"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Building2, MapPin, SquareArrowOutUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import VideoTransitionImage from "@/components/video-components/video-transition-image";
import { Suspense } from "react";

const videoHome = "/videos/home/an-home.mp4";
//const imageBgHome = "/images/bg-image/home.jpg";
const videoHomeMobile = "/videos/home/an-home-vertical.mp4";
const imageBgHomeMobile = "/images/bg-image/home-vertical.jpg";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <main className="h-screen w-full">
      <div className="relative flex h-dvh w-full flex-col items-center justify-center">
        {isMobile ? (
          <Suspense>
            <VideoTransitionImage
              video={videoHomeMobile}
              image={imageBgHomeMobile}
            />
          </Suspense>
        ) : (
          <Suspense>
            <VideoTransitionImage video={videoHome} /* image={imageBgHome} */ />
          </Suspense>
        )}

        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-neutral-800 opacity-60 md:hidden"></div>

        {/* content */}
        <section className="absolute flex h-screen w-full max-w-[1440px] animate-fade-in-right flex-col items-start justify-end gap-10 p-6 animate-delay-[2400ms] animate-duration-800 md:px-12 md:pb-32 lg:px-[120px]">
          <div className="max-w-xs space-y-6 md:max-w-full">
            <h1 className="text-4xl font-bold md:text-7xl">
              Down Peaks <br />
            </h1>
            <div className="w-full whitespace-normal break-words md:max-w-2xl">
              <span className="text-2xl md:text-5xl md:font-semibold">
                Tu proyecto lote, en su mejor versión
              </span>
            </div>

            <ul className="flex items-center gap-3 md:gap-6">
              <li className="flex w-48 flex-col">
                <span className="text-xl font-bold">5km </span>
                <span className="text-xs font-normal md:text-sm">
                  Aeropuerto Internacional Jorge Newbery
                </span>
              </li>
              {/* separador */}
              <div className="h-12 w-[2px] bg-[#70738E]"></div>
              <li className="flex w-40 flex-col">
                <span className="text-xl font-bold">150mt </span>
                <span className="text-xs font-normal md:text-sm">
                  De la estación <br /> Núñez
                </span>
              </li>
              <div className="h-12 w-[2px] bg-[#70738E]"></div>
              <li className="flex w-40 flex-col">
                <span className="text-xl font-bold">1km </span>
                <span className="text-xs font-normal md:text-sm">
                  Del Club Ciudad de Buenos Aires
                </span>
              </li>
            </ul>
          </div>

          <div className="flex w-full flex-col gap-3 rounded-3xl md:flex-row md:gap-6">
            <Button size={"sm"} asChild>
              <Link href={"/departamentos"}>
                <Building2 className="mr-2 h-4 w-4" /> Ver departamentos
              </Link>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"} variant={"inverse"}>
                  <MapPin className="mr-2 h-4 w-4" /> Ver ubicación
                </Button>
              </DialogTrigger>
              <DialogContent className="round h-[530px] w-80 max-w-4xl rounded-[20px] border-none md:h-fit md:w-[564px] lg:w-full lg:px-8">
                <DialogHeader className="pt-2">
                  <DialogTitle className="text-left font-serif text-2xl font-semibold md:text-3xl">
                    Ubicación
                  </DialogTitle>
                </DialogHeader>

                {/* google map */}
                <div className="flex w-full flex-col gap-6 md:gap-8 md:py-8 lg:flex-row">
                  <div className="w-full lg:w-2/4">
                    <Image
                      src={"/images/ubicacion-maps.jpg"}
                      alt="map"
                      width={430}
                      height={320}
                      className="h-36 rounded-md object-cover md:h-[200px] md:w-[500px] md:rounded-md lg:h-80 lg:w-[430px] lg:rounded-lg"
                    />
                  </div>

                  <div className="flex h-full flex-col items-start justify-center gap-4 lg:w-2/4">
                    <div className="flex flex-col items-start gap-3">
                      <span className="text-sm font-bold md:text-xl">
                        Dirección
                      </span>
                      <span className="text-sm md:text-base">
                        Manuela Pedraza 2001, Nuñez, Ciudad de Buenos Aires
                      </span>
                      <Button asChild variant={"link"} className="p-0">
                        <Link
                          href={"https://maps.app.goo.gl/a5w16utgffyXtmTt5"}
                          className="text-base font-semibold"
                          target="_blank"
                        >
                          Abrir en Mapas{" "}
                          <SquareArrowOutUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                      <span className="text-sm font-bold md:text-xl">
                        Cómo llegar
                      </span>
                      <span className="text-sm md:text-base">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Minus blanditiis laborum similique, quod, magnam
                        accusantium tempora
                      </span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </main>
  );
}
