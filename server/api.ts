"use server";

import { auth } from "@/auth";
import tryCatch, { Result } from "../lib/try-catch";
import { handleApiResponse } from "./handle-api-response";

const defaultHeaders = {
  "Content-Type": "application/json",
};

async function callApi<T, B = unknown>(
  baseUrl: string | undefined,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: B,
  apiKey?: string
): Promise<Result<T, Error>> {
  if (!baseUrl)
    return { data: null, error: new Error("Base URL is not defined") };

  return tryCatch(
    (async () => {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
          ...defaultHeaders,
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      console.log(response);

      return handleApiResponse<T>(response);
    })()
  );
}

export async function callSimulatorService<T, B = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: B,
  apiKey?: string
): Promise<Result<T, Error>> {
  const session = await auth();
  const baseUrl = session?.user.client.api_url?.replace(/\/message$/, "");
  return callApi<T, B>(baseUrl, endpoint, method, body, apiKey);
}

export async function callSwitchService<T, B = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: B,
  apiKey?: string
): Promise<Result<T, Error>> {
  return callApi<T, B>(
    process.env.SWITCH_SERVICE_URL,
    endpoint,
    method,
    body,
    apiKey
  );
}
