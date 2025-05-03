import { z } from 'zod';

export const DataSchema = z.object({
  word: z.string().default(''),
  phonetic: z.string().default(''),
  phonetics: z.array(
    z.object({
      text: z.string().default(''),
      audio: z.string().default(''),
      sourceUrl: z.string().default(''),
      license: z
        .object({ name: z.string().default(''), url: z.string().default('') })
        .default({ name: '', url: '' })
    })
  ),
  meanings: z.array(
    z.object({
      partOfSpeech: z.string().default(''),
      definitions: z.array(
        z.object({
          definition: z.string().default(''),
          synonyms: z.array(z.string().default('')),
          antonyms: z.array(z.string().default('')),
          example: z.string().default('')
        })
      ),
      synonyms: z.array(z.string().default('')),
      antonyms: z.array(z.string().default(''))
    })
  ),
  license: z
    .object({ name: z.string().default(''), url: z.string().default('') })
    .default({ name: '', url: '' }),
  sourceUrls: z.array(z.string().default(''))
});

export type IResult = z.infer<typeof DataSchema>;

export const ErrorSchema = z.object({
  title: z.string().default(''),
  message: z.string().default(''),
  resolution: z.string().default('')
});

export const SearchSchema = z.object({
  query: z.string().min(1, { message: "Whoop's, can't be empty" }).trim().default('')
});
