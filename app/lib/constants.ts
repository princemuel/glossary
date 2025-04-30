import { remember } from "@/helpers/singleton";

export const defaultQuery = "hello";
// export const defaultQuery = "keyboard";
export const searchParam = "query";

export const config = remember("__app_config__", () => ({
  application_name: "Glossary",
  name: "Glossary",
  description:
    "Glossary is the ultimate free dictionary app, perfect for language learners and students! Search and discover word meanings, definitions, synonyms, and usage examples instantly. Use our dictionary app for quick word lookup and vocabulary building.",
  locale: "en",
  author: "princemuel",
  defaultTheme: "dark",
  defaultFont: "mono",
  defaultQuery: "hello",
  searchParam: "query",
}));
