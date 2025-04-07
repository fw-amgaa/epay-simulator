"use client";

import type { Table } from "@tanstack/react-table";
import type * as React from "react";

import { DataTableFilterList } from "@/components/data-table/data-table-filter-list";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { cn } from "@/lib/utils";
import { DataTableAdvancedFilterField } from "@/config/data-table/types";

interface DataTableAdvancedToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  filterFields: DataTableAdvancedFilterField<TData>[];
  debounceMs?: number;
  shallow?: boolean;
}

export function DataTableAdvancedToolbar<TData>({
  table,
  filterFields = [],
  debounceMs = 300,
  shallow = true,
  children,
  className,
  ...props
}: DataTableAdvancedToolbarProps<TData>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2 overflow-auto py-1",
        className
      )}
      {...props}
    >
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <DataTableFilterList
            table={table}
            filterFields={filterFields}
            debounceMs={debounceMs}
            shallow={shallow}
          />
          <DataTableSortList
            table={table}
            debounceMs={debounceMs}
            shallow={shallow}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
