"use client";

import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableRowAction } from "@/config/data-table/types";
import { getBankName } from "@/lib/bank-codes";
import { BankAccount } from "../_lib/types";

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<BankAccount> | null>
  >;
}

export function getColumns({}: GetColumnsProps): ColumnDef<BankAccount>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5 mr-2"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      meta: {
        title: "Хүлээн авагч банк",
      },
      accessorKey: "bankCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Хүлээн авагч банк" />
      ),
      cell: ({ row }) => <div>{getBankName(row.original.bankCode)}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Дансны дугаар",
      },
      accessorKey: "accountNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Дансны дугаар" />
      ),
      cell: ({ row }) => <div>{row.original.accountNumber}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Дансны нэр",
      },
      accessorKey: "accountName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Дансны нэр" />
      ),
      cell: ({ row }) => <div>{row.original.accountName}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Хэрэглэгч",
      },
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Хэрэглэгч" />
      ),
      cell: ({ row }) => <div>{row.getValue("customer")}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Огноо",
      },
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Огноо" />
      ),
      cell: () => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {/* {moment(row.getValue("createdAt"))
                .utc()
                .format("YYYY/MM/DD HH:mm")} */}
              {"-"}
            </span>
          </div>
        );
      },
    },
  ];
}
