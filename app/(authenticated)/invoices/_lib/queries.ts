"use server";

import { auth } from "@/auth";
import { Invoice } from "./types";
import { CreateInvoiceSchema } from "./validations";
import { callSimulatorService } from "@/server/api";
import { revalidatePath } from "next/cache";

const resource = "/invoices";

export const getInvoices = async () => {
  const session = await auth();

  return callSimulatorService<Invoice[]>(
    resource,
    "GET",
    undefined,
    session?.user._id
  );
};

export const createInvoice = async (input: CreateInvoiceSchema) => {
  const session = await auth();

  const response = callSimulatorService<Invoice, CreateInvoiceSchema>(
    resource,
    "POST",
    input,
    session?.user._id
  );
  revalidatePath("/(authenticated)/invoices");
  return response;
};
