import { z } from "zod";

const success = z.object({
  word: z.string().default(""),
  phonetic: z.string().default(""),
  phonetics: z.array(
    z.object({
      text: z.string().default(""),
      audio: z.string().default(""),
      sourceUrl: z.string().default(""),
      license: z
        .object({ name: z.string().default(""), url: z.string().default("") })
        .default({ name: "", url: "" }),
    }),
  ),
  meanings: z.array(
    z.object({
      partOfSpeech: z.string().default(""),
      definitions: z.array(
        z.object({
          definition: z.string().default(""),
          synonyms: z.array(z.string().default("")),
          antonyms: z.array(z.string().default("")),
          example: z.string().default(""),
        }),
      ),
      synonyms: z.array(z.string().default("")),
      antonyms: z.array(z.string().default("")),
    }),
  ),
  license: z
    .object({ name: z.string().default(""), url: z.string().default("") })
    .default({ name: "", url: "" }),
  sourceUrls: z.array(z.string().default("")),
});

const error = z.object({
  title: z.string().default(""),
  message: z.string().default(""),
  resolution: z.string().default(""),
});

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, { message: "Whoop's, can't be empty" })
    .trim()
    .default(""),
});

export const schema = z.object({
  ok: z.boolean(),
  data: z.nullable(success),
  error: z.nullable(error),
});

export type Result = z.infer<typeof schema>;
