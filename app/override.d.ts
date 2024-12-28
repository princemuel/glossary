/// <reference types="vite-plugin-svgr/client" />

type ImportMetaEnv = Record<string, string>;

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface globalThis {
  __singletons?: Map<string, unknown>;
}

declare const __BUILD_DATE__: string;
