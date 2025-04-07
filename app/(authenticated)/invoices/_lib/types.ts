export type BankInfo = {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  accountCurrency: string;
  isDefault: boolean;
  _id: string;
};

export type Invoice = {
  _id: string;
  invoiceCode: string;
  qrCode: string;
  beneficiary: BankInfo;
  amount: number;
  currency: string;
  description: string;
  invoiceStatus: string;
  invoiceStatusDate: string;
  transactionType: string;
  isAllowCard: boolean;
  createdAt: string;
  updatedAt: string;
  paymentCode?: string;
  trxId?: string;
  paid?: BankInfo;
};
