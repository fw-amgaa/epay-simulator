import { getBankAccounts } from "../bank-accounts/_lib/queries";
import QrDecrypt from "./_components/qr-decrypt";

export default async function Page() {
  const { data } = await getBankAccounts();
  return <QrDecrypt accounts={data || []} />;
}
