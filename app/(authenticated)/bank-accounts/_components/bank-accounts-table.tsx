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
import { BankAccount } from "../_lib/types";
import { getColumns } from "./bank-accounts-table-columns";
import { BankAccountsTableToolbarActions } from "./bank-accounts-table-toolbar-actions";

interface BankAccountsTableProps {
  bankAccounts: BankAccount[];
}

export function BankAccountsTable({ bankAccounts }: BankAccountsTableProps) {
  const [, setRowAction] =
    React.useState<DataTableRowAction<BankAccount> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const advancedFilterFields: DataTableAdvancedFilterField<BankAccount>[] = [
    {
      id: "accountName",
      label: "Code",
      type: "multi-select",
      options: bankOptions,
    },
  ];

  const { table } = useDataTable({
    data: bankAccounts,
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
    <DataTable totalCount={bankAccounts.length} table={table}>
      <DataTableAdvancedToolbar
        table={table}
        filterFields={advancedFilterFields}
        shallow={false}
      >
        <BankAccountsTableToolbarActions table={table} />
      </DataTableAdvancedToolbar>
    </DataTable>
  );
}
