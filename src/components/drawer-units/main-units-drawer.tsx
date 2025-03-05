import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { FilterSidebar } from "@/components/sidebar-units/filter-sidebar";
import { DrawerScrollUnits } from "./drawer-scroll-units";
import { useUnitsByIdStore } from "@/stores/units-by-id.store";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { UnitsKuulaId } from "../units-kuula-id";
import { useState } from "react";
import { UnitsById } from "../units-by-id";

export const MainUnitsDrawer = () => {
  const selectedUnit = useUnitsByIdStore((state) => state.selectedUnit);
  const setSelectedUnit = useUnitsByIdStore((state) => state.setSelectedUnit);

  const [showKuulaId, setShowKuulaId] = useState(false); //estado para controlar la visibilidad de UnitsKuulaId mobile

  const handleBackUnits = () => {
    setSelectedUnit(null);
    setShowKuulaId(false);
  };

  const handleKuulaId = () => {
    setShowKuulaId(true);
  };

  return (
    <>
      {selectedUnit === null ? (
        <SidebarProvider defaultOpen={true}>
          <Drawer defaultOpen={false}>
            <DrawerTrigger asChild className="sticky top-full mx-6 mb-6 w-full">
              <Button variant="inverse" className="">
                Ver Departamentos
              </Button>
            </DrawerTrigger>

            <DrawerContent className="border-none">
              <DrawerHeader className="flex items-center justify-between px-6 py-4">
                <DrawerTitle className="text-lg font-bold">
                  Nuestras unidades
                </DrawerTitle>

                {/* filtro trigger*/}
                <SidebarTrigger />
                {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
              </DrawerHeader>

              <DrawerScrollUnits />
              {/* filtros mobile*/}
              {<FilterSidebar />}

              {/* boton cerrar drawer */}
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="inverse" className="w-full">
                    Cerrar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </SidebarProvider>
      ) : (
        <section className="z-40 flex flex-col items-center justify-center bg-background">
          {/* <div className="flex flex-col items-center justify-center gap-2 text-center"> */}
          <UnitsById
            showKuulaId={showKuulaId}
            setShowKuulaId={setShowKuulaId}
          />
          {showKuulaId && (
            <div className="absolute left-0 top-0 z-50 h-full w-full">
              <div
                className="absolute top-16 z-50 flex cursor-pointer items-center justify-center px-5 py-2 font-semibold text-[#B7BAD5] sm:top-20 sm:text-base lg:text-xs"
                onClick={handleBackUnits}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Regresar
              </div>
              <UnitsKuulaId />
            </div>
          )}
        </section>
      )}
    </>
  );
};
