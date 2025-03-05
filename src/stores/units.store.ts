import { Units } from '@/interfaces';

import { create } from 'zustand';

interface UnitsStore {
  unitsData: Units[];
  filteredUnitsData: Units[];
  getUnits: () => Promise<void>;
  
  unitsRooms: number[];
  setUnitsRooms: (unitsData: Units[]) => void;
  selectedRooms: number[];
  filteredRooms: (ambiente: number[]) =>  void;

  unitsAmenities: string[];
  setUnitsAmenities: (unitsData: Units[]) => void;
  selectedAmenities: string[];
  filteredAmenities: (amenities: string[]) => void;

  unitsArea: number[];
  setUnitsArea: (unitsData: Units[]) => void;
  selectedAreaRange: number[];
  filteredArea: (area: number[]) => void;

  unitsPrice: number[];
  setUnitsPrice: (unitsData: Units[]) => void;
  selectedPriceRange: number[];
  filteredPrice: (price: number[]) => void;

  applyFilters: () => void;
  resetFilters: () => void;
}

export const useUnitsStore = create<UnitsStore>()((set, get) => ({
  unitsData: [],
  filteredUnitsData: [],
  selectedRooms: [],
  selectedAmenities: [],
  selectedAreaRange: [0, 0],
  selectedPriceRange: [0, 0],
  
  getUnits: async () => {
    try {
      const response = await fetch('/api/units', { cache: 'no-store' });
      const data = await response.json();
      set((state) => ({ 
        unitsData: data.unit,
        filteredUnitsData: data.unit
      }
    ));

    get().setUnitsRooms(data.unit);
    get().setUnitsAmenities(data.unit);
    get().setUnitsArea(data.unit);
    get().setUnitsPrice(data.unit);
    
  } catch (error) {
    console.error("Error fetching units from zustand", error);
  }
},

  unitsRooms: [],
  setUnitsRooms: (unitsData) => {
    const unitRoom = Array.from(
      new Set(unitsData.map((unitRoom) => Number(unitRoom.ambientes))),
    ).sort((a, b) => a - b);

    set((state) => ({ unitsRooms: unitRoom }));
  },

  filteredRooms: (ambientes: number[]) => {
    set(() => ({ selectedRooms: ambientes }));
    get().applyFilters();
    
  },

  unitsAmenities: [],
  setUnitsAmenities: (unitsData) => {
    const unitAmenities: string[] = Array.from(
      new Set(
        unitsData.flatMap((unit) => {
          const amenities = [];

          if (unit.balcon) amenities.push('Balcón');
          if (unit.cochera) amenities.push('Cochera');
          if (unit.parrilla) amenities.push('Parrilla');

          return amenities;
        })
      )
    )

    set((state) => ({ unitsAmenities: unitAmenities }));
  },

  filteredAmenities: (amenities: string[]) => {
    set(() => ({ selectedAmenities: amenities }));
    get().applyFilters();
  },

  selectedArea: 0,
  unitsArea: [],
  setUnitsArea: (unitsData) => {
    const unitArea = Array.from(
      new Set(
        unitsData.map((unit) => Number(unit.m2Totales))
      )).sort((a, b) => a - b);

    set((state) => ({ 
      unitsArea: unitArea,
      selectedAreaRange: [unitArea[0], unitArea[unitArea.length - 1]]
    }));
  },

  filteredArea: (area: number[]) => {
    set(() => ({ selectedAreaRange: area }));
    get().applyFilters();
  },

  unitsPrice: [],
  setUnitsPrice: (unitsData) => {
    const price = Array.from(
      new Set(
        unitsData.map((unit) => Number(unit.precio))
      )).sort((a, b) => a - b)
      

    set((state) => ({ 
      unitsPrice: price,
      selectedPriceRange: [price[0], price[price.length - 1]]
    }));
  },

  filteredPrice: (price: number[]) => {
    set(() => ({ selectedPriceRange: price }));
    get().applyFilters();
  },

  applyFilters: () => {
    const { unitsData, selectedRooms, selectedAmenities,  selectedAreaRange, selectedPriceRange } = get();

    const filteredUnits = unitsData.filter((unit) => {

      const roomsMatch = selectedRooms.length === 0 || selectedRooms.includes(unit.ambientes);

      const amenities: string[] = [];

      if (unit.balcon) amenities.push('Balcón');
      if (unit.cochera) amenities.push('Cochera');
      if (unit.parrilla) amenities.push('Parrilla');
      
      const amenitiesMatch = selectedAmenities.length === 0 || selectedAmenities.every(amenity => amenities.includes(amenity));

      const areaMatch = unit.m2Totales >= selectedAreaRange[0] && unit.m2Totales <= selectedAreaRange[1];

      const priceMatch = unit.precio >= selectedPriceRange[0] && unit.precio <= selectedPriceRange[1];

      return roomsMatch && amenitiesMatch && areaMatch && priceMatch;

    });
      set(() => ({ filteredUnitsData: filteredUnits }));
    
  },

  resetFilters: () => {
    const { unitsData, unitsArea, unitsPrice } = get();
    set(() => ({
      filteredUnitsData: unitsData,
      selectedRooms: [],
      selectedAmenities: [],
      selectedAreaRange: [unitsArea[0], unitsArea[unitsArea.length - 1]],
      selectedPriceRange: [unitsPrice[0], unitsPrice[unitsPrice.length - 1]],
    }));
  }
  

}));