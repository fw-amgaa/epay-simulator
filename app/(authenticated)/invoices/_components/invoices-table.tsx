"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { bankOptions } from "@/lib/bank-codes";
import { getColumns } from "./invoices-table-columns";
import {
  DataTableRowAction,
  DataTableAdvancedFilterField,
} from "@/config/data-table/types";
import { Invoice } from "../_lib/types";
import { InvoicesTableToolbarActions } from "./invoices-table-toolbar-actions";

interface InvoicesTableProps {
  invoices: Invoice[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const [, setRowAction] = React.useState<DataTableRowAction<Invoice> | null>(
    null
  );

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const advancedFilterFields: DataTableAdvancedFilterField<Invoice>[] = [
    {
      id: "invoiceCode",
      label: "Code",
      type: "multi-select",
      options: bankOptions,
    },
  ];

  const { table } = useDataTable({
    data: invoices,
    columns,
    pageCount: 1,
    enableAdvancedFilter: true,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow._id.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable totalCount={invoices.length} table={table}>
      <DataTableAdvancedToolbar
        table={table}
        filterFields={advancedFilterFields}
        shallow={false}
      >
        <InvoicesTableToolbarActions table={table} />
      </DataTableAdvancedToolbar>
    </DataTable>
  );
}
