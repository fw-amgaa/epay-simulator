"use client";

import type { Table } from "@tanstack/react-table";
import { Payment } from "../_lib/types";
import { QrDecryptSheet } from "./qr-decrypt-sheet";

interface PaymentsTableToolbarActionsProps {
  table: Table<Payment>;
}

export function PaymentsTableToolbarActions({}: PaymentsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <QrDecryptSheet />
    </div>
  );
}
