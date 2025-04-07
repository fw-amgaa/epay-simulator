import { z } from "zod";

export const createInvoiceSchema = z.object({
  amount: z
    .number()
    .min(1, "Дүн оруулна уу.")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Дүн зөв оруулна уу.",
    }),
  description: z.string().min(1, "Гүйлгээний утга оруулна уу."),
  bankAccountId: z.string().min(1, "Банк сонгоно уу."),
});

export type CreateInvoiceSchema = z.infer<typeof createInvoiceSchema>;
