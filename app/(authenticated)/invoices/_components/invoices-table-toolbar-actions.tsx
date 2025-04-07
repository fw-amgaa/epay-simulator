"use client";

import type { Table } from "@tanstack/react-table";

import { Invoice } from "../_lib/types";
import { CreateInvoiceSheet } from "./create-invoice-sheet";

interface InvoicesTableToolbarActionsProps {
  table: Table<Invoice>;
}

export function InvoicesTableToolbarActions({}: InvoicesTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <CreateInvoiceSheet />
    </div>
  );
}
