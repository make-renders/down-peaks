"use client";

import { useUnitsByIdStore } from "@/stores/units-by-id.store";
import { useUnitsStore } from "@/stores/units.store";

export const UnitsKuulaId = () => {
  const selectedUnit = useUnitsByIdStore((state) => state.selectedUnit);

  const unitsData = useUnitsStore((state) => state.unitsData);

  const unit = unitsData.find((unit) => unit.id === selectedUnit);

  return (
    <div className="h-svh rounded-lg bg-background p-3 pt-28 sm:pt-32 lg:h-[744px] lg:pt-3">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
        scrolling="no"
        src={unit?.kuula}
        className="aspect-video rounded-xl shadow-md"
      ></iframe>
    </div>
  );
};
