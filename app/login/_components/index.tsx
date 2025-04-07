"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInSchema } from "@/auth";
import login from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Client } from "../_lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  clients: Client[];
}

export function LoginForm({ clients }: Props) {
  const router = useRouter();
  const onSubmit: SubmitHandler<SignInSchema> = async (values) => {
    await login(values).then((res) => {
      if (!!res?.error) {
        toast("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
      } else {
        router.replace("/");
      }
    });
  };

  const form = useForm<SignInSchema>();

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Нэвтрэх</CardTitle>
          <CardDescription>И-мэйл болон нууц үгээ оруулна уу.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="identifier">Харилцагч</Label>
                  <Select
                    value={form.watch("clientKey")}
                    onValueChange={(value: string) =>
                      form.setValue("clientKey", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={
                            client.api_keys.find((keys) => !!keys.status)
                              ?.key || ""
                          }
                        >
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="identifier">Хэрэглэгчийн нэр</Label>
                  <Input
                    placeholder="Хэрэглэгчийн нэр"
                    {...form.register("customerName")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Хэрэглэгчийн код</Label>
                  <Input
                    placeholder="Хэрэглэгчийн код"
                    {...form.register("customerCode")}
                    required
                  />
                </div>
                <Button
                  loading={form.formState.isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Нэвтрэх
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
