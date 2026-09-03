import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Typed, validated environment variables.
 * A missing or malformed value fails the build, not production.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    /**
     * Resend API key. Optional in the same spirit as the Cal link: unset means
     * there is no delivery yet, and the forms hand off to the visitor's mail
     * client rather than claiming to have received something they haven't.
     * Set it and the forms start posting, with no code change.
     */
    RESEND_API_KEY: z.string().min(1).optional(),
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
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_CAL_LINK: process.env.NEXT_PUBLIC_CAL_LINK,
  },
  emptyStringAsUndefined: true,
});
