"use client";

import { CheckIcon, PlusCircleIcon, SearchIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { getBankName } from "@/lib/bank-codes";
import { currencyFormat } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Invoice } from "../../invoices/_lib/types";
import { decryptQR, onPaid } from "../_lib/queries";
import { BankAccount } from "../../bank-accounts/_lib/types";
import { getBankAccounts } from "../../bank-accounts/_lib/queries";

export function QrDecryptSheet(
  props: React.ComponentPropsWithRef<typeof Sheet>
) {
  const [qrCode, setQrCode] = useState<string>("");
  const [invoice, setInvoice] = useState<Invoice>();
  const [loading, setLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [paid, setPaid] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setInvoice(undefined);
    setPaid(false);

    const { data, error } = await decryptQR(qrCode);
    setLoading(false);

    if (error) {
      toast.error("QR кодыг тайлахад алдаа гарлаа.");
      return;
    }

    if (data.paid) {
      toast.error("Энэ QR кодын төлбөр аль хэдийн төлөгдсөн байна.");
      return;
    }

    setInvoice(data);
    toast.success("QR кодыг амжилттай тайллаа.");
  };

  const handlePayment = async () => {
    setLoading(true);
    const { error } = await onPaid({
      paymentCode: invoice?.paymentCode || "",
      bankAccountId: selectedAccount,
    });
    setLoading(false);

    if (error) {
      toast.error("Төлбөр төлөхөд алдаа гарлаа.");
      return;
    }

    toast.success("Төлбөр амжилттай төлөгдлөө.");
    setPaid(true);
  };

  React.useEffect(() => {
    const fetchBankAccounts = async () => {
      const { data, error } = await getBankAccounts();
      if (error) {
        toast.error("Дансны мэдээллийг авахад алдаа гарлаа.");
        return;
      }
      setBankAccounts(data);
      setSelectedAccount(data[0]?._id);
    };

    fetchBankAccounts();
  }, []);

  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <Button size={"sm"} className="gap-2">
          <PlusCircleIcon className="size-4" aria-hidden="true" />
          Төлбөр төлөх
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Төлбөр төлөх</SheetTitle>
          <SheetDescription>Нэхэмжлэхийн дугаар оруулна уу.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col px-4 gap-4 overflow-hidden">
          <div className="flex gap-4 items-center">
            <h3 className="text-sm">Нэхэмжлэхийн Qr Code:</h3>
            <Button
              loading={loading}
              disabled={qrCode.length === 0}
              onClick={handleSearch}
              size={"sm"}
            >
              <SearchIcon />
              Хайх
            </Button>
          </div>
          <Textarea
            className="resize-none"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
          />

          {invoice && (
            <Card className="flex flex-col gap-6">
              <CardContent className="grid grid-cols-2 gap-3 items-center">
                <span className="text-muted-foreground text-sm">
                  Хүлээн авагч:
                </span>
                <p className="font-bold text-sm">
                  {invoice.beneficiary.accountName}
                </p>
                <span className="text-muted-foreground text-sm">Банк:</span>
                <p className="font-bold text-sm">
                  {getBankName(invoice.beneficiary.bankCode)}
                </p>
                <span className="text-muted-foreground text-sm">
                  Дансны дугаар
                </span>
                <p className="font-bold text-sm">
                  {invoice.beneficiary.accountNumber}
                </p>
                <span className="text-muted-foreground text-sm">Үнийн дүн</span>
                <p className="font-bold text-sm">
                  {currencyFormat(invoice.amount)}
                </p>
                <span className="text-muted-foreground text-sm">
                  Гүйлгээний утга:
                </span>
                <p className="font-bold text-sm">{invoice.description}</p>
                <span className="text-muted-foreground text-sm">
                  Төлбөр төлөх данс сонгох:
                </span>
                <Select
                  defaultValue={selectedAccount}
                  onValueChange={setSelectedAccount}
                >
                  <SelectTrigger size={"sm"}>
                    <SelectValue placeholder="Данс сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankAccounts.map((account) => (
                      <SelectItem key={account._id} value={account._id}>
                        {account.accountName} ({account.accountNumber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
              <CardFooter className="justify-center">
                {paid ? (
                  <div className="flex gap-2 items-center text-sm text-green-500">
                    <CheckIcon />
                    Төлбөр амжилттай төлөгдлөө
                  </div>
                ) : (
                  <Button
                    onClick={handlePayment}
                    disabled={!selectedAccount}
                    loading={loading}
                    size={"sm"}
                  >
                    Төлбөр төлөх
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
