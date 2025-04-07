"use client";

import React, { createContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface MetaProps {
  canDelete?: boolean;
  label: string;
  icon?: React.ReactNode;
  group?: string;
}

export interface ResourceProps {
  name: string;
  list?: string;
  create?: string;
  edit?: string;
  show?: string;
  meta?: MetaProps;
  children: ResourceProps[];
}

interface MenuContextProps {
  resources: ResourceProps[];
  selectedKey: string | null;
}

export const MenuContext = createContext<MenuContextProps | undefined>(
  undefined
);

interface MenuProviderProps {
  resources: ResourceProps[];
  children: ReactNode;
}

const findSelectedKey = (
  resources: ResourceProps[],
  pathname: string
): string | null => {
  for (const resource of resources) {
    if (
      resource.list === pathname ||
      resource.create === pathname ||
      (resource.edit?.includes(":id") &&
        pathname.startsWith(resource.edit.replace(":id", ""))) ||
      (resource.show?.includes(":id") &&
        pathname.startsWith(resource.show.replace(":id", "")))
    ) {
      return resource.name;
    }
    if (resource.children) {
      const foundInChildren = findSelectedKey(resource.children, pathname);
      if (foundInChildren) return foundInChildren;
    }
  }
  return null;
};

export const MenuProvider = ({ resources, children }: MenuProviderProps) => {
  const pathname = usePathname();
  const selectedKey = useMemo(
    () => findSelectedKey(resources, pathname),
    [pathname, resources]
  );

  return (
    <MenuContext.Provider value={{ resources, selectedKey }}>
      {children}
    </MenuContext.Provider>
  );
};
