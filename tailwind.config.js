import twForms from "@tailwindcss/forms";
import twDefaultTheme from "tailwindcss/defaultTheme";
import twPlugin from "tailwindcss/plugin";
import twConfig from "./tailwind.json";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./app/**/*.tsx"],
  future: "all",
  experimental: "all",
  theme: {
    screens: {
      "3xs": "24em", // @media (min-width: 384px) { ... }
      "2xs": "30em", // @media (min-width: 480px) { ... }
      ...twDefaultTheme.screens,
    },
    fluidCols: { fit: "fit", fill: "fill" },
    extend: {
      borderRadius: { pill: "100vmax" },
      colors: twConfig.theme.colors,
      fontFamily: {
        sans: [twConfig.theme.fontFamily.sans, ...twDefaultTheme.fontFamily.sans],
        serif: [
          twConfig.theme.fontFamily.serif,
          ...twDefaultTheme.fontFamily.serif,
        ],
        mono: [twConfig.theme.fontFamily.mono, ...twDefaultTheme.fontFamily.mono],
      },
      cursor: twConfig.theme.cursor,
      screens: {
        xs: "36em", // @media (min-width: 576px) { ... },
        sm: "40em", // @media (min-width: 640px) { ... }
        md: "48em", // @media (min-width: 768px) { ... }
        lg: "64em", // @media (min-width: 1024px) { ... }
        xl: "80em", // @media (min-width: 1280px) { ... }
        "2xl": "96em", // @media (min-width: 1536px) { ... }
        "3xl": "112.5em", // @media (min-width: 1800px) { ... }
      },
      animation: twConfig.theme.animation,
      keyframes: twConfig.theme.keyframes,
    },
  },
  plugins: [
    twForms({ strategy: "base" }),
    twPlugin(({ addVariant }) => {
      addVariant("sans", '&:where([data-font="sans"], [data-font="sans"] *)');
      addVariant("mono", '&:where([data-font="mono"], [data-font="mono"] *)');
      addVariant("serif", '&:where([data-font="serif"], [data-font="serif"] *)');
      addVariant("hocus", ["&:hover", "&:focus"]);
    }),
  ],
};
