import { createClient } from "next-sanity";
import { env } from "./env";

export const client = createClient({
    projectId: env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
});