import { RenderError } from "@/components/render-error";
import { RenderResult } from "@/components/render-result";
import { Wrapper } from "@/components/wrapper";

import { config, defaultQuery } from "@/lib/constants";
import { search } from "@/lib/search";
import { schema, searchSchema } from "@/schema/schema";

import { data } from "react-router";

import type { Route } from "./+types/_index";

type ResponseErr = {
  title: string;
  message: string;
  resolution: string;
  status: number;
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  // const query = defaultQuery;
  const url = new URL(request.url);

  let error = "";

  const searchParam = config.searchParam;

  try {
    if (url.searchParams.has(searchParam)) {
      const result = searchSchema.safeParse({
        query: url.searchParams.get(searchParam),
      });
      if (!result.success) {
        const errors = result.error.flatten();

        return data(
          {
            ok: false,
            error: errors.fieldErrors.query?.[0] || "Unknown Error",
            data: null,
          },
          { status: 400 },
        );
      }

      const response = await search(result.data.query);
      return data({ ok: true, error: null, data: schema.parse(response) });
    }

    const response = await search(defaultQuery);

    return data({ ok: true, error: null, data: schema.parse(response) });
  } catch {
    error = "Network error. Please try again.";
  }

  return data({ ok: false, error, data: null }, { status: 500 });
};

export default function Page({ loaderData }: Route.ComponentProps) {
  const { data: payload } = loaderData;

  return (
    <main aria-labelledby="headline error-msg">
      <Wrapper>
        {payload?.error ? (
          <section
            aria-labelledby="error-msg"
            className="grid min-h-[40vh] place-content-center"
          >
            <RenderError error={payload.error} />
          </section>
        ) : null}

        {payload?.data ? (
          <section aria-labelledby="headline" className="flex flex-col gap-8">
            <RenderResult data={payload.data} />
          </section>
        ) : null}
      </Wrapper>
    </main>
  );
}
