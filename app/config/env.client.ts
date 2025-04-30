import { isBrowser } from "@/helpers/is-browser";

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Client environment configuration.
 *
 * This configuration is specifically for client-side code.
 * It only includes those prefixed with `PUBLIC_`.
 * Empty strings are treated as `undefined`.
 */
export const { PUBLIC_SITE_URL } = createEnv({
  isServer: !isBrowser,
  emptyStringAsUndefined: true,
  runtimeEnv: import.meta.env,
  clientPrefix: "PUBLIC_",
  client: {
    PUBLIC_SITE_URL: z.string().min(1).url(),
  },
});
