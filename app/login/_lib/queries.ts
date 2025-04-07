"use server";

import { callSwitchService } from "@/server/api";
import { Client } from "./types";

const resource = "/clients";

export const getClients = async () => {
  return callSwitchService<Client[]>(
    resource,
    "GET",
    undefined,
    process.env.SWITCH_SERVICE_API_KEY
  );
};
