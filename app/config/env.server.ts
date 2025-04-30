import { isBrowser } from "@/helpers/is-browser";

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Server environment configuration.
 *
 * This configuration is specifically for server-side code.
 * It only includes those not prefixed with `PUBLIC_`.
 * Empty strings are treated as `undefined`.
 */
export const { DATABASE_URL } = createEnv({
  isServer: !isBrowser,
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  server: {
    DATABASE_URL: z.string().min(1).url(),
  },
});
