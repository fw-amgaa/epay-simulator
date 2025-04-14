"use client";

import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { QRCodeToggle } from "@/components/qr-code";
import { DataTableRowAction } from "@/config/data-table/types";
import { getBankName } from "@/lib/bank-codes";
import { currencyFormat } from "@/lib/utils";
import moment from "moment";
import { Payment } from "../_lib/types";

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<Payment> | null>
  >;
}

export function getColumns({}: GetColumnsProps): ColumnDef<Payment>[] {
  return [
    {
      meta: {
        title: "QR",
      },
      accessorKey: "qrcPayload",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="QR" />
      ),
      cell: ({ row }) => (
        <div className="pl-2">
          <QRCodeToggle value={row.original.qrcPayload} />
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
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Төлөв" />
      ),
      cell: ({ row }) => <div>{row.getValue("paymentStatus")}</div>,
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
        const createdAt = row.getValue("createdAt");
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {createdAt
                ? moment(createdAt).utc().format("YYYY/MM/DD HH:mm")
                : "-"}
            </span>
          </div>
        );
      },
    },
  ];
}
