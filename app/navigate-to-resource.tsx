"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { ResourceProps } from "@/providers/menu-provider";
import { useMenu } from "@/hooks/use-menu";

export const NavigateToResource = () => {
  const ran = useRef(false);
  const { replace } = useRouter();
  const { resources } = useMenu();

  const firstResource = useMemo(() => {
    const findFirstList = (
      resources: ResourceProps[]
    ): ResourceProps | undefined => {
      for (const resource of resources) {
        if (resource.list) return resource;
        if (resource.children) {
          const childResource = findFirstList(resource.children);
          if (childResource) return childResource;
        }
      }
      return undefined;
    };
    return findFirstList(resources);
  }, [resources]);

  useEffect(() => {
    if (firstResource && !ran.current) {
      replace(firstResource.list!);
      ran.current = true;
    }
  }, [firstResource, replace]);

  return null;
};
