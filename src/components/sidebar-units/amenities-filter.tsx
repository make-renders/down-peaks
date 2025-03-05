import { useUnitsStore } from "@/stores/units.store";

import { Checkbox } from "../ui/checkbox";

export const AmenitiesFilter = () => {
  /* Amenities */
  const unitsAmenities = useUnitsStore((state) => state.unitsAmenities);
  const filteredAmenities = useUnitsStore((state) => state.filteredAmenities);
  const selectedAmenities = useUnitsStore((state) => state.selectedAmenities);

  const handleCheckboxChangeAmenities = (
    checked: boolean,
    amenities: string,
  ) => {
    const checkAmenities = checked
      ? [...selectedAmenities, amenities]
      : selectedAmenities.filter((item) => item !== amenities);

    filteredAmenities(checkAmenities);
  };
  return (
    <>
      {unitsAmenities &&
        unitsAmenities.map((unit, idx) => (
          <div className="flex items-center space-x-2 pl-2" key={idx}>
            <Checkbox
              id={`comodidades-${unit}`}
              checked={selectedAmenities.includes(unit)}
              className="h-5 w-5 rounded-[4px] border-2 border-muted-foreground"
              value={unit}
              onCheckedChange={(checked) =>
                handleCheckboxChangeAmenities(checked as boolean, unit)
              }
            />
            <label
              htmlFor={`comodidades`}
              className="text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-xs sm:font-light"
            >
              {`${unit}`}
            </label>
          </div>
        ))}
    </>
  );
};
