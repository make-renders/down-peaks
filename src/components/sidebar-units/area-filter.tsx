import { useUnitsStore } from "@/stores/units.store";
import { SliderTooltip } from "../ui/slider-tooltip";

export const AreaFilter = () => {
  /* Area */
  const unitsArea = useUnitsStore((state) => state.unitsArea);
  const minArea = unitsArea[0] || 0;
  const maxArea = unitsArea[unitsArea.length - 1] || 0;
  const filteredArea = useUnitsStore((state) => state.filteredArea);
  const selectedAreaRange = useUnitsStore((state) => state.selectedAreaRange);

  const handleAreaChange = (area: number[]) => {
    filteredArea(area);
  };

  return (
    <div className="flex flex-col items-center gap-2 pl-2">
      <SliderTooltip
        tooltipFormatter={() =>
          `${selectedAreaRange[0]} m2 - ${selectedAreaRange[1]} m2`
        }
        className="py-2"
        onValueChange={handleAreaChange}
        min={minArea}
        max={maxArea}
        step={1}
        value={selectedAreaRange}
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-xs sm:font-light">
            MIN.
          </span>
          <span className="text-sm font-normal sm:text-xs">{minArea} m2</span>
        </div>
        <div className="flex flex-col text-end">
          <span className="text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-xs sm:font-light">
            MAX.
          </span>
          <span className="text-sm font-normal sm:text-xs">{maxArea} m2</span>
        </div>
      </div>
    </div>
  );
};
