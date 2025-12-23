import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    },
    server: {
        SANITY_PROJECT_ID: z.string().min(1),
        ICECAST_STREAM_URL: z.string().url().min(1),
    },
    runtimeEnv: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
        ICECAST_STREAM_URL: process.env.ICECAST_STREAM_URL,
    }
});