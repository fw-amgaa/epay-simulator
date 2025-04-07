import NextAuth from "next-auth";
import { Client, Customer } from "./app/login/_lib/types";

type ExtendedUser = {
  clientKey: string;
  client: Client;
  error?: string;
} & Customer;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: ExtendedUser;
  }
}
