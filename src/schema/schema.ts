import { z } from "astro:schema";

const successSchema = z.object({
  word: z.string(),
  phonetic: z.string().default(""),
  phonetics: z.array(
    z.object({
      text: z.string(),
      audio: z.string(),
      sourceUrl: z.string().default(""),
      license: z
        .object({ name: z.string(), url: z.string() })
        .default({ name: "", url: "" }),
    }),
  ),
  meanings: z.array(
    z.object({
      partOfSpeech: z.string(),
      definitions: z.array(
        z.object({
          definition: z.string(),
          synonyms: z.array(z.string()),
          antonyms: z.array(z.string()),
          example: z.string().default(""),
        }),
      ),
      synonyms: z.array(z.string()),
      antonyms: z.array(z.string()),
    }),
  ),
  license: z
    .object({ name: z.string(), url: z.string() })
    .default({ name: "", url: "" }),
  sourceUrls: z.array(z.string()),
});

const errorSchema = z.object({
  title: z.string(),
  message: z.string(),
  resolution: z.string(),
});

export const schema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: successSchema }),
  z.object({ status: z.literal("error"), error: errorSchema }),
]);
