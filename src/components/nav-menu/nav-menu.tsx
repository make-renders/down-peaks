"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
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

export const NavMenu = () => {
  const currentPath = usePathname();

  return (
    <header className="absolute z-50 w-full bg-none capitalize">
      <NavigationMenu className="mx-auto flex max-w-[1440px] animate-fade-in-down items-center justify-between px-20 pb-3 pt-8 animate-delay-[2400ms] animate-duration-800">
        <NavigationMenuItem className="list-none font-bold uppercase">
          <Link href={"/"} legacyBehavior passHref>
            <NavigationMenuLink className="flex items-center gap-2">
              <Image
                src={"/images/logos/isotipo-makers-rojo-32x32.png"}
                className="h-8 w-8"
                alt="logo"
                width={100}
                height={100}
              />
              Space3D
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuList className="rounded-full bg-foreground/30 backdrop-blur-sm">
          {filteredLinks.map((link) => (
            <NavigationMenuItem key={link.name}>
              <Button
                asChild
                className={cn(
                  "border-none bg-foreground/25 font-bold text-foreground shadow-none hover:bg-primary/25",
                  currentPath === link.href ? "" : "bg-transparent font-normal",
                )}
              >
                <Link href={link.href}>
                  {link.icon} {link.name}
                </Link>
              </Button>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <NavigationMenuItem className="list-none">
          <Button
            asChild
            variant={"inverse"}
            className={cn(
              "",
              currentPath === "/contacto" ? "" : "bg-transparent",
            )}
          >
            <Link href={"/contacto"}>contacto</Link>
          </Button>
        </NavigationMenuItem>
      </NavigationMenu>
    </header>
  );
};
