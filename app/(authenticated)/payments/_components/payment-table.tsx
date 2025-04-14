"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import {
  DataTableAdvancedFilterField,
  DataTableRowAction,
} from "@/config/data-table/types";
import { useDataTable } from "@/hooks/use-data-table";
import { bankOptions } from "@/lib/bank-codes";
import { Payment } from "../_lib/types";
import { getColumns } from "./payment-table-columns";
import { PaymentsTableToolbarActions } from "./payment-table-toolbar-actions";

interface PaymentsTableProps {
  payments: Payment[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const [, setRowAction] = React.useState<DataTableRowAction<Payment> | null>(
    null
  );

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const advancedFilterFields: DataTableAdvancedFilterField<Payment>[] = [
    {
      id: "accountName",
      label: "Code",
      type: "multi-select",
      options: bankOptions,
    },
  ];

  const { table } = useDataTable({
    data: payments,
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
    <DataTable totalCount={payments.length} table={table}>
      <DataTableAdvancedToolbar
        table={table}
        filterFields={advancedFilterFields}
        shallow={false}
      >
        <PaymentsTableToolbarActions table={table} />
      </DataTableAdvancedToolbar>
    </DataTable>
  );
}
