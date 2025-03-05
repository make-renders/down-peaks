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
import { MapPin, SquareArrowOutUpRight } from "lucide-react";

import AboutCarousel from "@/components/carousel/about-carousel";

export default function Page() {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-[1440px] flex-col items-center justify-around pb-6 pt-20 sm:pt-16 lg:flex-row lg:justify-between lg:gap-6 lg:px-[120px] lg:pb-0 lg:pt-0">
      <section className="flex flex-col gap-4 px-6 sm:px-12 md:gap-6 lg:max-w-xl">
        <div className="font-serif text-2xl font-medium md:text-6xl">
          Space3D
        </div>
        <div className="text-10 text-justify font-normal md:text-sm">
          Space3D nace como una respuesta visionaria a las necesidades del
          mercado moderno, combinando tecnología avanzada y creatividad sin
          límites. Diseñada como una Plataforma as a Service (PaaS) y marca
          registrada de Make Renders LLC, Space3D redefine la forma en que
          empresas, arquitectos, desarrolladores y creativos presentan y
          comunican sus proyectos al mundo.
        </div>
        <div className="text-10 text-justify font-normal md:text-sm">
          Space3D no es solo una plataforma; es experiencia entre la imaginación
          y la realidad. Su flexibilidad, accesibilidad y capacidad para
          integrar tecnología de punta la convierten en la solución ideal para
          quienes buscan destacar en un mundo donde la interacción y la
          innovación son clave.
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"xs"} variant={"inverse"} className="px-4 py-2">
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
                    src={"/images/ubicacion-maps.png"}
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
                      Salvador Debenedetti 602, La Lucila, Provincia de Buenos
                      Aires
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
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Minus blanditiis laborum similique, quod, magnam
                      accusantium tempora
                    </span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="relative w-full pb-2 pt-6 sm:pt-16 lg:max-w-xl lg:pb-0 lg:pt-0">
        <AboutCarousel />
      </section>
    </div>
  );
}
