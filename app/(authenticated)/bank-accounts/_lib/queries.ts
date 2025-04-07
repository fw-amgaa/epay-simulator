"use server";

import { auth } from "@/auth";
import { getBankName } from "@/lib/bank-codes";
import { callSimulatorService } from "@/server/api";
import { BankAccount } from "./types";
import { CreateBankAccountSchema } from "./validations";
import { revalidatePath } from "next/cache";

const resource = "/bank-accounts";

export const getBankAccounts = async () => {
  const session = await auth();

  return callSimulatorService<BankAccount[]>(
    resource,
    "GET",
    undefined,
    session?.user._id
  );
};

export const createBankAccount = async (input: CreateBankAccountSchema) => {
  const session = await auth();
  const bankCode = session?.user.client.code || "";
  const body = {
    ...input,
    bankCode,
    bankName: getBankName(bankCode),
  };
  const response = await callSimulatorService<
    BankAccount,
    CreateBankAccountSchema
  >(resource, "POST", body, session?.user._id);
  revalidatePath("/(authenticated)/bank-accounts");
  return response;
};
