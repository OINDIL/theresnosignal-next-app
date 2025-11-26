import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        SANITY_PROJECT_ID: z.string().min(1)
    },
    runtimeEnv: {
        SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID
    }
});