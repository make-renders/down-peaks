import { useUnitsByIdStore } from "@/stores/units-by-id.store";
import { useUnitsStore } from "@/stores/units.store";
import { ArrowLeft, CalendarDays, Eye, MoveLeft } from "lucide-react";
import { formatNumberMil } from "../utils/formatNumberMil";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface UnitsByIdProps {
  showKuulaId?: boolean;
  setShowKuulaId?: (showKuulaId: boolean) => void;
}

export const UnitsById = ({ showKuulaId, setShowKuulaId }: UnitsByIdProps) => {
  const selectedUnit = useUnitsByIdStore((state) => state.selectedUnit);
  const setSelectedUnit = useUnitsByIdStore((state) => state.setSelectedUnit);

  const unitsData = useUnitsStore((state) => state.unitsData);
  const unit = unitsData.find((unit) => unit.id === selectedUnit);

  const handleBackUnits = () => {
    setSelectedUnit(null);
  };

  const extractRaxo = (url: string) => {
    const match = url.match(/\/([^/]+)\.png$/);
    return match ? match[1] : null;
  };

  return (
    <main className="flex h-svh w-screen flex-col rounded-xl bg-background lg:h-[740px] lg:w-[300px]">
      <div className="flex h-full flex-col justify-between pt-20 sm:pt-20 lg:pt-[74px]">
        {/* Información de la unidad y raxo */}
        <section className="flex flex-1 flex-col">
          <div
            className="flex cursor-pointer items-center justify-start px-5 py-2 font-semibold text-[#B7BAD5] sm:text-base lg:text-xs"
            onClick={handleBackUnits}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Regresar
          </div>
          <section className="flex flex-col items-start justify-start gap-2 px-5 py-3 sm:pt-6">
            <span className="sm:text-lg sm:font-normal lg:text-sm lg:font-semibold">
              UNIDAD {unit?.id}
            </span>
            <span className="border-l-2 border-foreground pl-3 font-serif text-2xl font-semibold lining-nums">
              U$S {formatNumberMil(unit?.precio)}
            </span>
          </section>
          {/* Cards de información */}
          <section className="grid grid-cols-3 gap-2 px-5 py-2">
            <div className="flex h-20 flex-col justify-end gap-1 rounded-[10px] bg-[#292C47] p-3 lg:w-20">
              <span className="font-bold sm:text-base lg:text-sm">
                {unit?.piso}
              </span>
              <span className="text-xs font-normal text-[#B7BAD5]">Piso</span>
            </div>
            <div className="flex h-20 flex-col justify-end gap-1 rounded-[10px] bg-[#292C47] p-3 lg:w-20">
              <span className="font-bold sm:text-base lg:text-sm">
                {unit?.ambientes}
              </span>
              <span className="text-xs font-normal text-[#B7BAD5] text-muted-foreground">
                Amb.
              </span>
            </div>
            <div className="flex h-20 flex-col justify-end gap-1 rounded-[10px] bg-[#292C47] p-3 lg:w-20">
              <span className="font-bold sm:text-base lg:text-sm">
                {unit?.tipologia}
              </span>
              <span className="text-xs font-normal text-[#B7BAD5]">
                Tipologia
              </span>
            </div>
            <div className="flex h-20 flex-col justify-end gap-1 rounded-[10px] bg-[#292C47] p-3 lg:w-20">
              <div className="flex items-start font-bold sm:text-base lg:text-sm">
                {unit?.m2Cubiertos} m
                <span className="sm:text-10 font-light lg:text-[8px]">2</span>
              </div>
              <div className="text-[0.625rem] font-normal leading-3 text-[#B7BAD5]">
                <span className="block lg:hidden">Sup. cubierta</span>
                <span className="hidden lg:block">Superficie cubierta</span>
              </div>
            </div>
            <div className="flex h-20 flex-col justify-end gap-1 rounded-[10px] bg-[#292C47] p-3 lg:w-20">
              <div className="flex items-start font-bold sm:text-base lg:text-sm">
                {unit?.m2Totales} m
                <span className="sm:text-10 font-light lg:text-[8px]">2</span>
              </div>
              <div className="text-[0.625rem] font-normal leading-3 text-[#B7BAD5]">
                <span className="block lg:hidden">Sup. total</span>
                <span className="hidden lg:block">Superficie total</span>
              </div>
            </div>
            <div className="flex h-20 flex-col justify-end gap-1 rounded-[10px] bg-[#292C47] p-3 lg:w-20">
              <div className="flex items-start font-bold sm:text-base lg:text-sm">
                {unit?.m2Descubiertos} m
                <span className="sm:text-10 font-light lg:text-[8px]">2</span>
              </div>
              <div className="text-[0.625rem] font-normal leading-3 text-[#B7BAD5]">
                <span className="block lg:hidden">Sup. balcon</span>
                <span className="hidden lg:block">Superficie balcon</span>
              </div>
            </div>
          </section>
          {/* Imagen de la raxo */}
          <section className="relative mx-auto w-full flex-1 sm:py-0 lg:py-4 lg:pt-3">
            <Image
              src={`/images/raxo/raxo-alta/${extractRaxo(unit?.raxo ?? "")}.png`}
              alt="raxo"
              fill
              className="object-contain object-center px-3"
            />
          </section>
        </section>
        {/* Botones de acción */}
        <section className="flex w-full flex-col items-center justify-center gap-3 p-5 pb-4 sm:flex-row">
          <Button asChild variant={"default"} className="w-full">
            <Link
              href={"https://calendly.com/makerenders/hola"}
              target="_blank"
            >
              <CalendarDays className="mr-2 h-4 w-4" /> Agendar llamada
            </Link>
          </Button>
          <Button
            onClick={() => setShowKuulaId && setShowKuulaId(!showKuulaId)}
            variant={"inverse"}
            className="w-full lg:hidden"
          >
            <Eye className="mr-2 h-4 w-4" /> Recorrido virtual
          </Button>
        </section>
      </div>
    </main>
  );
};
