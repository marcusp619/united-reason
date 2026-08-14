import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Typed, validated environment variables.
 * A missing or malformed value fails the build, not production.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().default("https://unitedreason.org"),
    /** Cal.com booking link, e.g. "unitedreason/intro". */
    NEXT_PUBLIC_CAL_LINK: z.string().min(1).default("unitedreason/intro"),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_CAL_LINK: process.env.NEXT_PUBLIC_CAL_LINK,
  },
  emptyStringAsUndefined: true,
});
