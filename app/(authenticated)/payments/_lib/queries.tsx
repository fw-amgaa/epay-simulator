"use server";

import { auth } from "@/auth";
import { callSimulatorService } from "@/server/api";
import { Invoice } from "../../invoices/_lib/types";
import { GetPaymentsApiResponse } from "./types";

export const getPayments = async () => {
  const session = await auth();

  return callSimulatorService<GetPaymentsApiResponse>(
    "/payments",
    "GET",
    undefined,
    session?.user._id
  );
};

export const decryptQR = async (code: string) => {
  const session = await auth();
  return callSimulatorService<Invoice, { qrcPayload: string }>(
    "/qr-decrypt",
    "POST",
    { qrcPayload: code },
    session?.user._id
  );
};

type QrPaymentSchema = {
  paymentCode: string;
  bankAccountId: string;
};

export const onPaid = async (input: QrPaymentSchema) => {
  const session = await auth();
  return callSimulatorService<Invoice, QrPaymentSchema>(
    "/on-paid",
    "POST",
    input,
    session?.user._id
  );
};
