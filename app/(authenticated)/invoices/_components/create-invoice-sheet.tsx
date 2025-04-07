"use client";

import { Loader, PlusCircleIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getBankAccounts } from "@/app/(authenticated)/bank-accounts/_lib/queries";
import { BankAccount } from "@/app/(authenticated)/bank-accounts/_lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoice } from "../_lib/queries";
import { createInvoiceSchema, CreateInvoiceSchema } from "../_lib/validations";

export function CreateInvoiceSheet(
  props: React.ComponentPropsWithRef<typeof Sheet>
) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const [bankAccounts, setBankAccounts] = React.useState<BankAccount[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getBankAccounts().then((res) => {
      setBankAccounts(res.data || []);
    });
  }, []);

  const form = useForm<CreateInvoiceSchema>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      amount: 0,
      description: "",
      bankAccountId: "",
    },
  });

  function onSubmit(input: CreateInvoiceSchema) {
    startUpdateTransition(async () => {
      const { error } = await createInvoice(input);

      if (error) {
        toast.error(error.message);
        return;
      }

      form.reset();
      setOpen(false);
      toast.success("Нэхэмжлэл амжилттай үүслээ.");
    });
  }

  return (
    <Sheet {...props} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"sm"} className="gap-2">
          <PlusCircleIcon className="size-4" aria-hidden="true" />
          Нэхэмжлэл үүсгэх
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Нэхэмжлэл үүсгэх</SheetTitle>
          <SheetDescription>
            Нэхэмжлэл үүсгэхийн тулд мэдээллийг бөглөнө үү.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 px-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дүн</FormLabel>
                    <FormControl>
                      <Input
                        ref={field.ref}
                        value={field.value}
                        type="number"
                        placeholder="100"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.onChange(value ? parseInt(value) : "");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Гүйлгээний утга</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="qpay 558823967775399, Худалдан авалт"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankAccountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Хүлээн авах данс</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize w-full">
                          <SelectValue placeholder="Сонгох" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {bankAccounts.map((account) => (
                            <SelectItem
                              key={account._id}
                              value={account._id}
                              className="capitalize"
                            >
                              {account.accountName} ({account.accountNumber})
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className="gap-2 pt-8 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Буцах
                </Button>
              </SheetClose>
              <Button disabled={isUpdatePending}>
                {isUpdatePending && (
                  <Loader
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Хадгалах
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
