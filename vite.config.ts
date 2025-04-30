import { reactRouter as router } from "@react-router/dev/vite";
import icon from "unplugin-icons/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  envPrefix: "PUBLIC_",
  server: { port: 3000, host: true },
  plugins: [
    router(),
    icon({ compiler: "jsx", jsx: "react", scale: 1 }),
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: { floatPrecision: 2 },
      },
    }),
    tsconfigPaths(),
  ],
  define: { __BUILD_DATE__: JSON.stringify(new Date()) },
});
