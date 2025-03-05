import { useUnitsStore } from "@/stores/units.store";
import { Checkbox } from "../ui/checkbox";

export const RoomFilter = () => {
  /* Ambientes */
  const unitsRooms = useUnitsStore((state) => state.unitsRooms);
  const filteredRooms = useUnitsStore((state) => state.filteredRooms);
  const selectedRooms = useUnitsStore((state) => state.selectedRooms);
  // Manejar el cambio en los checkboxes
  const handleCheckboxChangeRooms = (checked: boolean, room: number) => {
    const checkRooms = checked
      ? [...selectedRooms, room]
      : selectedRooms.filter((item) => item !== room);

    filteredRooms(checkRooms);
  };
  return (
    <>
      {unitsRooms &&
        unitsRooms.map((unit, idx) => (
          <div className="flex items-center space-x-2 pl-2" key={idx}>
            <Checkbox
              id={`ambientes-${unit}`}
              checked={selectedRooms.includes(unit)}
              className="h-5 w-5 rounded-[4px] border-2 border-muted-foreground"
              value={unit}
              onCheckedChange={(checked) =>
                handleCheckboxChangeRooms(checked as boolean, unit)
              }
            />
            <label
              htmlFor={`ambientes`}
              className="text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-xs sm:font-light"
            >
              {`${unit} Ambientes`}
            </label>
          </div>
        ))}
    </>
  );
};
