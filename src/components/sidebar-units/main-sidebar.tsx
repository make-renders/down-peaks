"use client";

import { SidebarScrollUnits } from "./sidebar-Scroll-units";
import { FilterSidebar } from "@/components/sidebar-units/filter-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UnitsById } from "../units-by-id";

import { useUnitsByIdStore } from "@/stores/units-by-id.store";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MainSidebar = () => {
  const selectedUnit = useUnitsByIdStore((state) => state.selectedUnit);

  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <div className={cn(selectedUnit === null ? "" : "hidden")}>
          <FilterSidebar />
          <SidebarTrigger className="absolute left-[267px] top-[68px] z-50" />
        </div>
      </SidebarProvider>

      <aside className="z-10 flex h-[744px] w-[300px] flex-col items-start rounded-xl bg-background">
        {selectedUnit === null ? (
          <motion.div
            key="sidebarScroll"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <SidebarScrollUnits />
          </motion.div>
        ) : (
          <motion.div
            key="unitsById"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <UnitsById />
          </motion.div>
        )}
      </aside>
    </>
  );
};
