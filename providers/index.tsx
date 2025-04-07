"use client";

import { type ThemeProviderProps } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { MenuProvider } from "./menu-provider";
import resources from "@/providers/resources";

export function Providers({ children }: ThemeProviderProps) {
  return (
    <SessionProvider>
      <TooltipProvider>
        <MenuProvider resources={resources}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </MenuProvider>
      </TooltipProvider>
    </SessionProvider>
  );
}
