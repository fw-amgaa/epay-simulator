import { BankAccount } from "../../bank-accounts/_lib/types";

export type GetPaymentsApiResponse = {
  data: Payment[];
  total: number;
};

export type Payment = {
  _id: string;
  qrcPayload: string;
  customerCode: string;
  customerName: string;
  paymentStatus: string;
  paymentStatusDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  amount: number;
  currency: string;
  description: string;
  invoiceCode: string;
  trxId: string;
  accountCurrency: string;
  accountName: string;
  accountNumber: string;
  bankCode: string;
  beneficiaryBankAccounts: BankAccount[];
  paymentMethod: "BANK_ACCOUNT";
};
