import { ResourceProps } from "@/providers/menu-provider";
import {
  BanknoteIcon,
  CoinsIcon,
  CreditCardIcon,
  WalletIcon,
} from "lucide-react";

const resources: ResourceProps[] = [
  {
    name: "invoices",
    list: "/invoices",
    meta: {
      canDelete: true,
      label: "Нэхэмжлэл",
      icon: <BanknoteIcon />,
      group: "system",
    },
    children: [],
  },
  {
    name: "payments",
    list: "/payments",
    meta: {
      canDelete: true,
      label: "Төлбөр",
      icon: <CoinsIcon />,
      group: "system",
    },
    children: [],
  },
  {
    name: "bank_accounts",
    list: "/bank-accounts",
    meta: {
      label: "Дансны мэдээлэл",
      canDelete: true,
      icon: <WalletIcon />,
      group: "settings",
    },
    children: [],
  },
  {
    name: "cards",
    list: "/cards",
    meta: {
      label: "Картын мэдээлэл",
      canDelete: true,
      icon: <CreditCardIcon />,
      group: "settings",
    },
    children: [],
  },
];

export default resources;
