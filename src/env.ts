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
    /**
     * Cal.com booking link, e.g. "unitedreason/intro".
     * Deliberately optional with no default: unset means booking isn't live yet,
     * and /book falls back to email rather than rendering Cal's "event type not
     * found" screen. The canonical site URL lives in src/content/site.ts.
     */
    NEXT_PUBLIC_CAL_LINK: z.string().min(1).optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CAL_LINK: process.env.NEXT_PUBLIC_CAL_LINK,
  },
  emptyStringAsUndefined: true,
});
