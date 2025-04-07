"use client";

import { Loader, PlusCircleIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBankAccount } from "../_lib/queries";
import {
  createBankAccountSchema,
  CreateBankAccountSchema,
} from "../_lib/validations";

export function CreateBankAccountSheet(
  props: React.ComponentPropsWithRef<typeof Sheet>
) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);

  const form = useForm<CreateBankAccountSchema>({
    resolver: zodResolver(createBankAccountSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
    },
  });

  function onSubmit(input: CreateBankAccountSchema) {
    startUpdateTransition(async () => {
      const { error } = await createBankAccount(input);

      if (error) {
        toast.error(error.message);
        return;
      }

      form.reset();
      toast.success("Данс амжилттай үүслээ.");
      setOpen(false);
    });
  }

  return (
    <Sheet {...props} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"sm"} className="gap-2">
          <PlusCircleIcon className="size-4" aria-hidden="true" />
          Данс үүсгэх
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Данс үүсгэх</SheetTitle>
          <SheetDescription>Дансны нэр, дугаар оруулна уу.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 px-4">
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нэр</FormLabel>
                    <FormControl>
                      <Input placeholder="Enkhsod" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дансны дугаар</FormLabel>
                    <FormControl>
                      <Input placeholder="5012341951" {...field} />
                    </FormControl>
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
