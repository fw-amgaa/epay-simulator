import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { auth } from "@/auth";

const TeamSwitcher = async () => {
  const session = await auth();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-primary-foreground shrink-0">
            <Image
              src={
                session?.user.client.logo ||
                "https://play-lh.googleusercontent.com/9S3Ji4v3iqVXjjtDdtPSb1onTbiPPcjyXDuwE55t7-WaKVQm1-brqvWlrN9O1Aqdbb4"
              }
              alt="logo"
              width={32}
              height={32}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <Image
              src={"/epay-logo-full.png"}
              width={80}
              height={25}
              alt={"epay-logo-full"}
            />
            <span className="truncate text-xs">
              {session?.user.client.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default React.memo(TeamSwitcher);
