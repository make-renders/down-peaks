import { useUnitsStore } from "@/stores/units.store";
import { SliderTooltip } from "../ui/slider-tooltip";
import { formatNumberMil } from "../../utils/formatNumberMil";

export const PriceFilter = () => {
  /* Precio */
  const unitsPrice = useUnitsStore((state) => state.unitsPrice);
  const minPrice = unitsPrice[0] || 0;
  const maxPrice = unitsPrice[unitsPrice.length - 1] || 0;
  const filteredPrice = useUnitsStore((state) => state.filteredPrice);
  const selectedPriceRange = useUnitsStore((state) => state.selectedPriceRange);

  const handlePriceChange = (price: number[]) => {
    filteredPrice(price);
  };

  return (
    <div className="flex flex-col items-center gap-2 pl-2">
      <SliderTooltip
        tooltipFormatter={(values) =>
          `usd ${formatNumberMil(selectedPriceRange[0])} - usd ${formatNumberMil(selectedPriceRange[1])}`
        }
        className="py-2"
        onValueChange={handlePriceChange}
        min={minPrice}
        max={maxPrice}
        step={1500}
        value={selectedPriceRange}
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-xs sm:font-light">
            MIN
          </span>
          <span className="text-sm font-normal sm:text-xs">
            usd <br /> {formatNumberMil(minPrice)}
          </span>
        </div>
        <div className="flex flex-col text-end">
          <span className="text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-xs sm:font-light">
            MAX
          </span>
          <span className="text-sm font-normal sm:text-xs">
            usd <br /> {formatNumberMil(maxPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};
