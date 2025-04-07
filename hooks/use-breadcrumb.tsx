import { usePathname } from "next/navigation";
import { useMenu } from "./use-menu";
import { ResourceProps } from "@/providers/menu-provider";

export const useBreadcrumb = () => {
  const { resources } = useMenu();
  const pathname = usePathname();

  const findBreadcrumbTrail = (
    resources: ResourceProps[],
    pathname: string
  ): { label: string; href: string }[] => {
    for (const resource of resources) {
      if (
        [resource.list, resource.create, resource.edit, resource.show].includes(
          pathname
        )
      ) {
        return [
          {
            label: resource.meta?.label || resource.name,
            href: resource.list || "#",
          },
        ];
      }
      if (resource.children) {
        const childTrail = findBreadcrumbTrail(resource.children, pathname);
        if (childTrail.length) {
          return [
            {
              label: resource.meta?.label || resource.name,
              href: resource.list || "#",
            },
            ...childTrail,
          ];
        }
      }
    }
    return [];
  };

  return { breadcrumbs: findBreadcrumbTrail(resources, pathname) };
};
