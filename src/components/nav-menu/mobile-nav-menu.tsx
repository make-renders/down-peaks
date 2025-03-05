import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, forwardRef } from "react";

import { motion, MotionConfig } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Building2, Home, MapPinHouse, Users } from "lucide-react";

const links = [
  { name: "inicio", icon: <Home size={16} className="mr-3" />, href: "/" },
  {
    name: "departamentos",
    icon: <Building2 size={16} className="mr-3" />,
    href: "/departamentos",
  },
  {
    name: "vecindario",
    icon: <MapPinHouse size={16} className="mr-3" />,
    href: "/barrio",
  },
  {
    name: "nosotros",
    icon: <Users size={16} className="mr-3" />,
    href: "/nosotros",
  },
  { name: "contacto", href: "/contacto" },
];

const filteredLinks = links.filter((link) => link.href !== "/contacto");

export const MobileNavMenu = () => {
  const currentPath = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute z-40 w-full bg-none">
      <div className="flex items-center justify-between gap-2 px-6 pt-5 md:px-12">
        <Link href={"/"}>
          <div className="flex items-center gap-2 text-base font-bold uppercase">
            <Image
              src={"/images/logos/isotipo-makers-rojo-32x32.png"}
              className="h-8 w-8"
              alt="logo"
              width={100}
              height={100}
            />
            Space3D
          </div>
        </Link>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <AnimatedHamburgerButton open={open} setOpen={setOpen} />
          </DrawerTrigger>
          {/* <DrawerContent className="inset-x-6 bottom-6 overflow-hidden rounded-lg border-none bg-background px-6"> */}
          <DrawerContent className="border-none px-6">
            <DrawerHeader className="pl-0">
              <DrawerTitle className="font-serif text-2xl font-semibold">
                Menú
              </DrawerTitle>
              {/*< DrawerDescription>
                This action cannot be undone.
              </DrawerDescription> */}
            </DrawerHeader>
            <div className="flex flex-col items-start justify-start gap-2">
              {filteredLinks.map((link) => (
                <Button
                  asChild
                  variant={"secondary"}
                  key={link.name}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex w-full items-center justify-start bg-popover px-4 py-3 text-base font-bold text-foreground",
                    currentPath === link.href
                      ? ""
                      : "bg-transparent font-normal",
                  )}
                >
                  <Link href={link.href}>
                    {link.icon} {link.name}
                  </Link>
                </Button>
              ))}
            </div>
            <DrawerFooter className="mb-7 mt-4 flex flex-col justify-between gap-4 pl-0 md:flex-row md:items-end">
              <Button
                asChild
                onClick={() => setOpen(false)}
                variant={"inverse"}
                className={cn(
                  "",
                  currentPath === "/contacto" ? "" : "bg-transparent",
                )}
              >
                <Link href={"/contacto"}>contacto</Link>
              </Button>
              <div>
                <Link
                  href={"https://makerenders.io"}
                  className="flex items-center"
                  target={"_blank"}
                >
                  <span className="text-xs font-normal">Powered by</span>
                  <Image
                    src={"/images/logos/logo-makerenders.jpg"}
                    alt="logo"
                    width={100}
                    height={100}
                    className="ml-3 mr-1 h-4 w-4 rounded"
                  />
                  <span className="text-xs font-bold uppercase">
                    Make renders
                  </span>
                </Link>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimatedHamburgerButton = forwardRef<HTMLButtonElement, Props>(
  ({ open, setOpen }, ref) => {
    return (
      <MotionConfig
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <motion.button
          initial={false}
          onClick={() => setOpen((pv) => !pv)}
          animate={open ? "open" : "closed"}
          className="relative h-12 w-12 rounded-full bg-transparent"
          ref={ref} // Aquí pasamos la ref al botón
        >
          <motion.span
            style={{
              left: "50%",
              top: "28%",
              x: "-50%",
              y: "-50%",
            }}
            className="absolute h-[2px] w-8 rounded-full bg-primary"
            variants={{
              open: {
                rotate: ["0deg", "0deg", "45deg"],
                top: ["28%", "50%", "50%"],
              },
              closed: {
                rotate: ["45deg", "0deg", "0deg"],
                top: ["50%", "50%", "28%"],
              },
            }}
          />
          <motion.span
            style={{
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            className="absolute h-[2px] w-8 rounded-full bg-primary"
            variants={{
              open: {
                rotate: ["0deg", "0deg", "-45deg"],
              },
              closed: {
                rotate: ["-45deg", "0deg", "0deg"],
              },
            }}
          />
          <motion.span
            style={{
              left: "calc(50% + 8px)",
              bottom: "28%",
              x: "-50%",
              y: "50%",
            }}
            className="absolute h-[2px] w-4 rounded-full bg-primary"
            variants={{
              open: {
                rotate: ["0deg", "0deg", "45deg"],
                left: "50%",
                bottom: ["28%", "50%", "50%"],
              },
              closed: {
                rotate: ["45deg", "0deg", "0deg"],
                left: "calc(50% + 8px)",
                bottom: ["50%", "50%", "28%"],
              },
            }}
          />
        </motion.button>
      </MotionConfig>
    );
  },
);

// Especificamos el nombre del componente para depuración
AnimatedHamburgerButton.displayName = "AnimatedHamburgerButton";
