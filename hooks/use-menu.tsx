import { MenuContext } from "@/providers/menu-provider";
import { useContext } from "react";

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
