import { create } from 'zustand';

interface UnitsByIdStore {

  selectedUnit: number | null;
  setSelectedUnit: (unit: number | null)  => void;
}

export const useUnitsByIdStore = create<UnitsByIdStore>()((set) => ({

  selectedUnit: null,
  setSelectedUnit: (unit) => {
    set(() => ({ selectedUnit: unit }));
  },


}));