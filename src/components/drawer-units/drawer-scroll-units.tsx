import { useUnitsStore } from "@/stores/units.store";
import { ScrollUnits } from "../sidebar-units/scroll-units";
import { Badge } from "../ui/badge";
import { formatNumberMil } from "@/utils/formatNumberMil";

export const DrawerScrollUnits = () => {
  const selectedAmenities = useUnitsStore((state) => state.selectedAmenities);
  const selectedRooms = useUnitsStore((state) => state.selectedRooms);

  const selectedAreaRange = useUnitsStore((state) => state.selectedAreaRange);
  const unitsArea = useUnitsStore((state) => state.unitsArea);

  const selectedPriceRange = useUnitsStore((state) => state.selectedPriceRange);
  const unitsPrice = useUnitsStore((state) => state.unitsPrice);
  return (
    <section className="flex h-[450px] w-full flex-col pb-4 sm:h-[530px]">
      <div className="w-full flex-grow overflow-hidden">
        {/* badge filters */}
        <div className="sm:pb-3 lg:pb-0">
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

          {selectedAreaRange[0] === unitsArea[0] &&
          selectedAreaRange[1] === unitsArea[unitsArea.length - 1] ? null : (
            <div className="flex items-center justify-start gap-2 px-4 pt-2">
              <Badge className="rounded-[6px] bg-[#33344F] text-sm font-bold text-secondary-foreground hover:bg-[#33344F]">
                {`Area ${selectedAreaRange[0]} - ${selectedAreaRange[1]} m2`}
              </Badge>
            </div>
          )}

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
