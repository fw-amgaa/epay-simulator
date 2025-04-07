"use client";

import type { Table } from "@tanstack/react-table";

import { BankAccount } from "../_lib/types";
import { CreateBankAccountSheet } from "./create-bank-account-sheet";

interface BankAccountsTableToolbarActionsProps {
  table: Table<BankAccount>;
}

export function BankAccountsTableToolbarActions({}: BankAccountsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <CreateBankAccountSheet />
    </div>
  );
}
