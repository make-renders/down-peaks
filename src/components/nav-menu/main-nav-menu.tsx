"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { NavMenu } from "./nav-menu";
import { MobileNavMenu } from "./mobile-nav-menu";

export const MainNavMenu = () => {
  const isDesktop = useMediaQuery("(min-width: 769px)");

  if (isDesktop) {
    return <NavMenu />;
  }
  return <MobileNavMenu />;
};
