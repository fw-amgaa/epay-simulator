"use client";

import { ChevronRight } from "lucide-react";
import React, { cloneElement } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../../ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ResourceProps } from "@/providers/menu-provider";
import { useMenu } from "@/hooks/use-menu";

interface Props {
  label: string;
  resources: ResourceProps[];
}

export const MenuList = () => {
  const { resources } = useMenu();

  return (
    <>
      <Menu
        label="Систем"
        resources={resources.filter((item) => item.meta?.group === "system")}
      />
      <Menu
        label="Тохиргоо"
        resources={resources.filter((item) => item.meta?.group === "settings")}
      />
    </>
  );
};

const Menu = ({ label, resources }: Props) => {
  const { selectedKey } = useMenu();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {resources.map(({ name, children, list, meta }) => {
          const isSelected =
            name === selectedKey ||
            !!children.find((child) => child.name === selectedKey);

          const Icon: React.ReactElement = meta?.icon ? (
            cloneElement(
              meta?.icon as React.DetailedReactHTMLElement<
                {
                  color: string;
                },
                HTMLElement
              >,
              { color: isSelected ? "#e04e61" : "#3F3F46" }
            )
          ) : (
            <></>
          );

          if (!list) {
            return (
              <Collapsible
                key={meta?.label}
                asChild
                defaultOpen={isSelected}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isSelected}
                      tooltip={meta?.label}
                    >
                      {Icon}
                      <span className={isSelected ? "text-primary" : ""}>
                        {meta?.label}
                      </span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {children?.map((child) => {
                        const isSelected = child.name === selectedKey;
                        return (
                          <Tooltip key={child.meta?.label}>
                            <TooltipTrigger asChild>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                  isActive={isSelected}
                                  asChild
                                >
                                  <a href={child.list as string}>
                                    <span
                                      className={cn(
                                        isSelected ? "text-primary" : "",
                                        "whitespace-wrap"
                                      )}
                                    >
                                      {child.meta?.label}
                                    </span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </TooltipTrigger>
                            <TooltipContent side="right" align="center">
                              {child.meta?.label}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          return (
            <SidebarMenuItem key={meta?.label}>
              <SidebarMenuButton
                tooltip={meta?.label}
                isActive={isSelected}
                asChild
              >
                <a href={list as string}>
                  {Icon}
                  <span className={isSelected ? "text-primary" : ""}>
                    {meta?.label}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
