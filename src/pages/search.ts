import { defaultQuery } from "@/lib/constants";
import { search } from "@/lib/search";
import { type Result, schema, searchSchema } from "@/schema/schema";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  let payload: Result | null = null;
  let error = "";
  if (url.searchParams.has("query")) {
    const result = searchSchema.safeParse({
      query: url.searchParams.get("query"),
    });
    if (!result.success) {
      const errors = result.error.flatten();
      error = errors.fieldErrors.query?.[0] || "Unknown Error";
      return Response.json(error, { status: 400 });
    }
    const response = await search(result.data.query);
    payload = schema.parse(response);
  } else {
    const response = await search(defaultQuery);
    payload = schema.parse(response);
  }
  return Response.json(payload);
};
