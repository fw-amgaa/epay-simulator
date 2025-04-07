import { LoginForm } from "@/app/login/_components";
import Image from "next/image";
import { getClients } from "./_lib/queries";

export default async function Login() {
  const { data, error } = await getClients();

  const filteredData = (data || []).filter(
    (client) => client.api_keys.length > 0
  );

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Image
            src={"/epay-logo-full.png"}
            width={160}
            height={20}
            alt="epay-logo-full"
          />
        </a>
        {error ? (
          <div className="text-center text-sm text-destructive">
            {error.message}
          </div>
        ) : (
          <LoginForm clients={filteredData} />
        )}
      </div>
    </div>
  );
}
