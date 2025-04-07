"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export default async function login(input: {
  clientKey: string;
  customerName: string;
  customerCode: string;
}) {
  try {
    await signIn("credentials", input);
    return { success: true, error: "" };
  } catch (error) {
    console.error("wtf", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid Password" };
        default:
          return { success: false, error: "Something went wrong" };
      }
    }
  }
}
