import { create } from 'zustand';

interface UnitsSelectionVisibleStore {
  visible: number | null;
  setVisible: (index: number | null)  => void;
  clearVisible: () => void;
}

export const useUnitsSelectionVisibleStore = create<UnitsSelectionVisibleStore>()((set) => ({

  visible: null,
  setVisible: (index) => set({ visible: index }),
  clearVisible: () => set({ visible: null }),
}));