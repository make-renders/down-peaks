"use client";

import { useUnitsStore } from "@/stores/units.store";
import { ScrollUnits } from "./scroll-units";
import { Badge } from "../ui/badge";
import { formatNumberMil } from "@/utils/formatNumberMil";
import { useEffect, useState } from "react";

export const SidebarScrollUnits = () => {
  const selectedAmenities = useUnitsStore((state) => state.selectedAmenities);
  const selectedRooms = useUnitsStore((state) => state.selectedRooms);

  const selectedAreaRange = useUnitsStore((state) => state.selectedAreaRange);
  const unitsArea = useUnitsStore((state) => state.unitsArea);

  const selectedPriceRange = useUnitsStore((state) => state.selectedPriceRange);
  const unitsPrice = useUnitsStore((state) => state.unitsPrice);

  const [isMounted, setIsMounted] = useState(false); // Estado de carga

  // Simula la carga inicial
  useEffect(() => {
    setIsMounted(true); // El componente se ha montado
  }, []);

  return (
    <section className="flex h-[740px] w-full flex-col pb-4 pt-20">
      <span className="px-4 text-sm font-bold">Nuestras unidades</span>

      <div className="w-full flex-grow overflow-hidden">
        <div className="pb-3">
          <div className="flex flex-wrap items-center justify-start gap-2 px-4 pt-2">
            {selectedRooms.map((room, index) => (
              <Badge
                key={index}
                className="rounded-[6px] bg-[#33344F] text-end text-sm font-bold text-secondary-foreground hover:bg-[#33344F]"
              >
                {room} ambientes
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-start gap-2 px-4 pt-2">
            {selectedAmenities.map((amenity, index) => (
              <Badge
                key={index}
                className="rounded-[6px] bg-[#33344F] text-sm font-bold text-secondary-foreground hover:bg-[#33344F]"
              >
                {amenity}
              </Badge>
            ))}
          </div>

          {/* Badge de Rango de Área */}
          {isMounted &&
          selectedAreaRange[0] !== 0 &&
          selectedAreaRange[1] !== 0 &&
          (selectedAreaRange[0] !== unitsArea[0] ||
            selectedAreaRange[1] !== unitsArea[unitsArea.length - 1]) ? (
            <div className="flex items-center justify-start gap-2 px-4 pt-2">
              <Badge className="rounded-[6px] bg-[#33344F] text-sm font-bold text-secondary-foreground hover:bg-[#33344F]">
                {`Área ${selectedAreaRange[0]} - ${selectedAreaRange[1]} m2`}
              </Badge>
            </div>
          ) : null}

          {formatNumberMil(selectedPriceRange[0]) ===
            formatNumberMil(unitsPrice[0]) &&
          formatNumberMil(selectedPriceRange[1]) ===
            formatNumberMil(unitsPrice[unitsPrice.length - 1]) ? null : (
            <div className="flex items-center justify-start gap-2 px-4 pt-2">
              <Badge className="rounded-[6px] bg-[#33344F] text-sm font-bold text-secondary-foreground hover:bg-[#33344F]">
                {`Precio usd ${formatNumberMil(selectedPriceRange[0])} - ${formatNumberMil(selectedPriceRange[1])}`}
              </Badge>
            </div>
          )}
        </div>

        {/* //* Scroll cards units */}
        <ScrollUnits />
      </div>
    </section>
  );
};
