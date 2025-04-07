import * as React from "react";

import TeamSwitcher from "@/components/layout/sidebar/team-switcher";
import { User } from "@/components/layout/sidebar/user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MenuList } from "./menu";
import { auth } from "@/auth";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <MenuList />
      </SidebarContent>
      <SidebarFooter>
        <User session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
