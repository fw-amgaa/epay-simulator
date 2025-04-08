"use client";

import type { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import * as React from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableRowAction } from "@/config/data-table/types";
import { currencyFormat } from "@/lib/utils";
import { Invoice } from "../_lib/types";
import { QRCodeToggle } from "@/components/qr-code";
import { getBankName } from "@/lib/bank-codes";

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<Invoice> | null>
  >;
}

export function getColumns({}: GetColumnsProps): ColumnDef<Invoice>[] {
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
        title: "QR",
      },
      accessorKey: "qrCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="QR" />
      ),
      cell: ({ row }) => (
        <div className="pl-2">
          <QRCodeToggle value={row.original.qrCode} />
        </div>
      ),
      enableSorting: false,
    },
    {
      meta: {
        title: "Нэхэмжлэхийн дугаар",
      },
      accessorKey: "invoiceCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Нэхэмжлэхийн дугаар" />
      ),
      cell: ({ row }) => <div>{row.getValue("invoiceCode")}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Хүлээн авагч банк",
      },
      accessorKey: "beneficiary.bankCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Хүлээн авагч банк" />
      ),
      cell: ({ row }) => (
        <div>{getBankName(row.original.beneficiary.bankCode)}</div>
      ),
      enableSorting: false,
    },
    {
      meta: {
        title: "Дансны дугаар",
      },
      accessorKey: "beneficiary.accountNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Дансны дугаар" />
      ),
      cell: ({ row }) => <div>{row.original.beneficiary.accountNumber}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Дансны нэр",
      },
      accessorKey: "beneficiary.accountName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Дансны нэр" />
      ),
      cell: ({ row }) => <div>{row.original.beneficiary.accountName}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Илгээгч банк",
      },
      accessorKey: "paid.bankCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Илгээгч банк" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.paid?.bankCode
            ? getBankName(row.original.paid?.bankCode)
            : "-"}
        </div>
      ),
      enableSorting: false,
    },
    {
      meta: {
        title: "Илгээгч дансны дугаар",
      },
      accessorKey: "paid.accountNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Илгээгч дансны дугаар" />
      ),
      cell: ({ row }) => <div>{row.original.paid?.accountNumber || "-"}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Илгээгч дансны нэр",
      },
      accessorKey: "paid?.accountName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Илгээгч дансны нэр" />
      ),
      cell: ({ row }) => <div>{row.original.paid?.accountName || "-"}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Гүйлгээний утга",
      },
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Гүйлгээний утга" />
      ),
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Гүйлгээний дүн",
      },
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Гүйлгээний дүн" />
      ),
      cell: ({ row }) => <div>{currencyFormat(row.getValue("amount"))}</div>,
      enableSorting: false,
    },
    {
      meta: {
        title: "Төлөв",
      },
      accessorKey: "invoiceStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Төлөв" />
      ),
      cell: ({ row }) => <div>{row.getValue("invoiceStatus")}</div>,
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
      cell: ({ row }) => {
        const label = ["opt1, opt2"].find(
          (label) => label === row.original.createdAt
        );

        return (
          <div className="flex space-x-2">
            {label && <Badge variant="outline">{label}</Badge>}
            <span className="max-w-[31.25rem] truncate font-medium">
              {moment(row.getValue("createdAt"))
                .utc()
                .format("YYYY/MM/DD HH:mm")}
            </span>
          </div>
        );
      },
    },
  ];
}
