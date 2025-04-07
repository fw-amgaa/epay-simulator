import type { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./sidebar";
import { Header } from "./header";
import { Shell } from "../ui/shell";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex p-4">
          <Shell className="gap-2">{children}</Shell>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
