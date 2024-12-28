import { reactRouter as router } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {
  target: "19", // '17' | '18' | '19'
};

export default defineConfig({
  envPrefix: "PUBLIC_",
  server: { port: 3000, host: true },
  plugins: [
    tailwindcss(),
    router(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
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
