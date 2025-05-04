import { DATABASE_URL } from '$env/static/private';
import { parse } from '$lib/server/parse';
import { DataSchema, SearchSchema } from '$lib/server/schema';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type ResponseErr = {
  title: string;
  message: string;
  resolution: string;
  status: number;
};

export const load: PageServerLoad = async () => {
  const res = await fetch(new URL(`hello`, DATABASE_URL));
  if (!res.ok) {
    const e = (await res.json()) as ResponseErr;
    error(res.status, {
      title: e.title,
      message: e.message,
      resolution: e.resolution
    });
  }

  const data = await res.json();

  const result = DataSchema.safeParse(parse(data));

  if (!result.success)
    error(404, {
      title: 'Unknown Error',
      message: 'Invalid data recieved',
      resolution: 'Please try again later'
    });

  return { results: result.data };
};

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();

    const formResult = SearchSchema.safeParse(form.get('query'));

    if (!formResult.success) return { formError: formResult.error.issues[0].message };

    const res = await fetch(new URL(formResult.data, DATABASE_URL));
    if (!res.ok) {
      const e = (await res.json()) as ResponseErr;
      return {
        query: formResult.data,
        error: {
          title: e.title,
          message: e.message,
          resolution: e.resolution
        }
      };
    }

    const data = await res.json();

    const result = DataSchema.safeParse(parse(data));

    if (!result.success)
      return {
        query: formResult.data,
        error: {
          title: 'Network error. Please try again.',
          message: 'Invalid data recieved',
          resolution: 'Please try again later'
        }
      };

    return { results: result.data };
  }
} satisfies Actions;
