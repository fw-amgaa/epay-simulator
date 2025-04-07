import { z } from "zod";

export const createBankAccountSchema = z.object({
  accountNumber: z.string().min(1, { message: "Дансны дугаар оруулна уу" }),
  accountName: z.string().min(1, { message: "Дансны нэр оруулна уу" }),
});

export type CreateBankAccountSchema = z.infer<typeof createBankAccountSchema>;
