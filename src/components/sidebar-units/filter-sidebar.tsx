"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

import { useUnitsStore } from "@/stores/units.store";
import { RoomFilter } from "./room-filter";
import { AmenitiesFilter } from "./amenities-filter";
import { AreaFilter } from "./area-filter";
import { PriceFilter } from "./price-filter";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "../ui/scroll-area";

export function FilterSidebar() {
  const resetFilters = useUnitsStore((state) => state.resetFilters);

  const handleResetFilters = () => {
    resetFilters();
  };

  const isMobile = useMediaQuery("(max-width: 425px)");

  return (
    <Sidebar variant="floating" className="absolute">
      {isMobile ? (
        <>
          <SidebarHeader className="flex pl-6 pr-4 pt-14 sm:hidden">
            Aplicar filtros
          </SidebarHeader>
          <ScrollArea className="h-[500px] w-full pb-4 pt-6">
            <SidebarContent className="space-y-3 pl-5 pr-4">
              <SidebarGroup className="rounded-md bg-[#33344F] p-2 shadow">
                <SidebarGroupLabel className="text-sm font-semibold uppercase tracking-widest">
                  Ambientes
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <RoomFilter />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="rounded-md bg-[#33344F] p-2 shadow">
                <SidebarGroupLabel className="text-sm font-semibold uppercase tracking-widest">
                  comodidades
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <AmenitiesFilter />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="rounded-md bg-[#33344F] shadow">
                <SidebarGroupLabel className="text-sm font-semibold uppercase tracking-widest">
                  area
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="pr-3">
                    <AreaFilter />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="rounded-md bg-[#33344F] shadow">
                <SidebarGroupLabel className="text-sm font-semibold uppercase tracking-widest">
                  precios
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="pr-3">
                    <PriceFilter />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </ScrollArea>
          <div className="flex w-full items-center justify-end px-5 pt-2 sm:pb-8 lg:pb-0">
            <Button
              size={"xs"}
              variant="default"
              className="w-full"
              onClick={handleResetFilters}
            >
              Reiniciar filtros
            </Button>
          </div>
        </>
      ) : (
        <>
          <SidebarHeader className="pl-6 pr-4 sm:pt-12 lg:pt-[76px]">
            <span className="font-bold">Aplicar filtros</span>
          </SidebarHeader>
          <SidebarContent className="space-y-1 pl-5 pr-4 sm:pt-6 lg:pt-4">
            <SidebarGroup className="rounded-md bg-[#33344F] p-2 shadow">
              <SidebarGroupLabel className="text-[0.625rem] font-semibold uppercase tracking-widest">
                Ambientes
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <RoomFilter />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="rounded-md bg-[#33344F] p-2 shadow">
              <SidebarGroupLabel className="text-[0.625rem] font-semibold uppercase tracking-widest">
                comodidades
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <AmenitiesFilter />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="rounded-md bg-[#33344F] shadow">
              <SidebarGroupLabel className="text-[0.625rem] font-semibold uppercase tracking-widest">
                area
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="pr-3">
                  <AreaFilter />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="rounded-md bg-[#33344F] shadow">
              <SidebarGroupLabel className="text-[0.625rem] font-semibold uppercase tracking-widest">
                precios
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="pr-3">
                  <PriceFilter />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="flex w-full items-center justify-end pt-2 sm:pb-8 lg:pb-0">
              <Button
                size={"xs"}
                variant="default"
                className="w-full"
                onClick={handleResetFilters}
              >
                Reiniciar filtros
              </Button>
            </div>
          </SidebarContent>
        </>
      )}
    </Sidebar>
  );
}
