import CredentialsProvider from "next-auth/providers/credentials";
import { object, string, z } from "zod";
import { authError } from "./lib/constants";
import { Customer } from "./app/login/_lib/types";
import NextAuth from "next-auth";
import { getClients } from "./app/login/_lib/queries";

export const signInSchema = object({
  clientKey: string(),
  customerName: string(),
  customerCode: string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      credentials: {
        clientKey: {
          label: "Client Key",
          type: "text",
        },
        customerName: {
          label: "Customer Name",
          type: "text",
        },
        customerCode: {
          label: "Customer Code",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { clientKey, customerName, customerCode } =
          await signInSchema.parseAsync(credentials);

        const { data } = await getClients();

        const client = data?.find((client) =>
          client.api_keys.find((key) => key.key === clientKey)
        );

        const baseUrl = client?.api_url.replace(/\/message$/, "");

        const response = await fetch(baseUrl + "/customers", {
          headers: {
            "x-api-key": clientKey,
          },
        });

        const customers = await response.json();
        const customer = customers.find(
          (customer: Customer) =>
            customer.customerName === customerName &&
            customer.customerCode === customerCode
        );

        if (!customer || !client) {
          return { error: authError };
        }

        return { ...customer, id: customer._id, error: "", clientKey, client };
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line
    async signIn({ user }: any) {
      if (user?.error === authError) {
        return false;
      }
      return true;
    },
    jwt: ({ user, token }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        // eslint-disable-next-line
        session.user = token.user as any;
      }

      return session;
    },
  },
  secret: process.env.NEXT_SECRET,
});
