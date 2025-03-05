"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useUnitsStore } from "@/stores/units.store";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "../ui/badge";

import { useShallow } from "zustand/react/shallow";
import { formatNumberMil } from "@/utils/formatNumberMil";
import { useUnitsByIdStore } from "@/stores/units-by-id.store";
import { useUnitsSelectionVisibleStore } from "@/stores/units-selection-visible.store";
import { Loader } from "../ui/loader";

export const ScrollUnits = () => {
  const getUnits = useUnitsStore((state) => state.getUnits);

  const filteredUnits = useUnitsStore(
    useShallow((state) => state.filteredUnitsData),
  ); // Uso las unidades filtradas

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      setIsLoading(true);
      await getUnits();
      setIsLoading(false);
    };

    fetchUnits();
  }, [getUnits]);

  const setSelectedUnit = useUnitsByIdStore((state) => state.setSelectedUnit);

  const handleClickUnit = (unit: number) => {
    setSelectedUnit(unit);
  };

  const setVisible = useUnitsSelectionVisibleStore((state) => state.setVisible);
  const clearVisible = useUnitsSelectionVisibleStore(
    (state) => state.clearVisible,
  );

  const handleHoverEnter = (index: number) => {
    setVisible(index);
  };
  const handleHoverLeave = () => {
    clearVisible();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollArea className="h-full w-full overflow-y-auto pb-4">
        <div className="grid w-full grid-cols-2 flex-wrap items-center justify-center gap-2 pb-16 pl-4 pr-3 sm:grid-cols-3 sm:px-6 lg:flex lg:pl-4 lg:pr-3">
          {filteredUnits.length === 0 ? (
            <div className="col-span-3 flex h-full w-full flex-col items-center justify-center gap-2 text-center lg:px-6">
              <div className="mt-6 rounded-full border border-[#292C47] bg-[#21243F] p-7">
                <Image
                  src={"/images/logos/logo-makerenders.jpg"}
                  alt="Logo MakeRenders"
                  width={32}
                  height={32}
                  className="h-9 w-9 rounded-sm object-contain grayscale"
                />
              </div>
              <p className="text-sm font-bold">
                No encontramos resultados <br /> para esa búsqueda
              </p>
              <span className="text-xs font-normal">
                Intenta aplicando otros filtros
              </span>
            </div>
          ) : (
            filteredUnits.map((unit, index) => (
              /* unit card container */
              <div
                key={unit.id}
                className="relative flex w-full flex-col items-center justify-between rounded-[10px] border border-[#33344F] transition-colors duration-500 hover:border-[#70738E] hover:bg-[#1A1D38] lg:h-[163px] lg:w-[130px]"
              >
                {/* Unidades vendidas */}
                {unit.vendido == "si" ? (
                  <div className="w-full">
                    <div className="flex w-full items-center justify-center py-1 grayscale">
                      <Badge className="absolute left-2 top-2 w-fit bg-muted-foreground/90 font-bold text-white hover:bg-muted-foreground/90">
                        Reservado
                      </Badge>
                      <Image
                        src={unit.raxo}
                        alt="raxo"
                        width={130}
                        height={92}
                        className="object-contain p-0 lg:h-full lg:w-full"
                      />
                    </div>

                    <div className="flex w-full flex-col gap-0 px-3 pb-3 pt-2 text-left text-muted-foreground lg:pt-0">
                      <span className="text-10 pb-1 font-semibold uppercase">
                        Unidad {unit.id}
                      </span>
                      <div className="text-10 flex items-center font-normal">
                        <span>{unit.ambientes} &nbsp; Amb.</span>
                        <div className="mx-2 h-3 w-[1px] bg-muted-foreground"></div>
                        <span>{unit.m2Totales} m2</span>
                      </div>
                      <span className="text-sm font-bold">
                        U$S &nbsp; {formatNumberMil(unit.precio)}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Unidades disponibles */
                  <div
                    /* hover para el depto selection */
                    onMouseEnter={() => handleHoverEnter(index)}
                    onMouseLeave={() => handleHoverLeave()}
                    onClick={() => handleClickUnit(unit.id)}
                    className="w-full cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-center py-1">
                      <Image
                        src={unit.raxo}
                        alt="raxo"
                        width={130}
                        height={92}
                        className="object-contain p-0 lg:h-full lg:w-full"
                      />
                    </div>

                    <div className="flex w-full flex-col gap-0 px-3 pb-3 pt-2 text-left lg:pt-0">
                      <span className="text-10 pb-1 font-semibold uppercase text-muted-foreground">
                        Unidad {unit.id}
                      </span>
                      <div className="text-10 flex items-center font-normal">
                        <span>{unit.ambientes} &nbsp; Amb.</span>
                        <div className="mx-2 h-3 w-[1px] bg-muted-foreground"></div>
                        <span>{unit.m2Totales} m2</span>
                      </div>
                      <span className="text-sm font-bold">
                        U$S &nbsp; {formatNumberMil(unit.precio)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </>
  );
};
