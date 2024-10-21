import pwa, { type PwaOptions } from "@vite-pwa/astro";
import icon from "astro-icon";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";

const manifest = (() => {
  type ManifestPromise = Promise<PwaOptions["manifest"]>;
  try {
    return import("./manifest.json").then((r) => r.default) as ManifestPromise;
  } catch (error) {
    return {} as ManifestPromise;
  }
})();

const PWAOptions: PwaOptions = {
  registerType: "prompt",
  pwaAssets: { disabled: false, config: true, overrideManifestIcons: true },
  experimental: { directoryAndTrailingSlashHandler: true },
  manifest: await manifest,
  devOptions: { enabled: false, suppressWarnings: true, type: "module" },
  workbox: {
    cleanupOutdatedCaches: true,
    clientsClaim: true,
  },
};

type Environment = NonNullable<
  ReturnType<typeof import("astro/config")["defineConfig"]>["experimental"]
>["env"];

const z = envField;

const environment: Environment = {
  validateSecrets: true,
  schema: {
    PUBLIC_URL: z.string({ context: "client", access: "public", url: true }),
    DB_URL: z.string({ context: "server", access: "secret", url: true }),
    ASTRO_KEY: z.string({ context: "server", access: "secret" }),
  },
};

const mode = process.env.NODE_ENV ?? "production";
const envVars = loadEnv(mode, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [icon({ iconDir: "src/assets/icons" }), pwa(PWAOptions)],
  site: envVars.PUBLIC_URL,
  experimental: {
    globalRoutePriority: true,
    contentCollectionCache: true,
    serverIslands: true,
    contentIntellisense: true,
    contentLayer: true,
    directRenderScript: true,
    env: environment,
  },
  security: { checkOrigin: true },
});
