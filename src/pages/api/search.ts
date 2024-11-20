import { parseError } from "@/helpers/error";
import { merge } from "@/helpers/merge";
import { escape_regex } from "@/helpers/utils";

import { DB_URL } from "astro:env/server";

import type { APIRoute } from "astro";
type ResponseErr = {
  title: string;
  message: string;
  resolution: string;
  status: number;
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  let query = (url.searchParams.get("query") ?? "").trim();
  query = escape_regex(query).trim();

  if (!query) throw new Error("Whoops, can't be empty");

  try {
    const response = await fetch(new URL(`en/${query}`, DB_URL));
    if (!response.ok) {
      const e = (await response.json()) as ResponseErr;
      e.status = response.status;
      throw e;
    }

    const data = await response.json();
    return Response.json({ ok: true, data: merge(data), error: null });
  } catch (e) {
    let status = 400;
    let title = "";
    let message = "";
    let resolution = "";

    //@ts-expect-error
    if ("resolution" in e) {
      const ex = e as ResponseErr;
      title = ex.title;
      message = ex.message;
      resolution = ex.resolution;
      status = ex.status;
      return Response.json(
        { ok: false, error: { title, message, resolution }, data: null },
        { status },
      );
    }

    title = "Unexpected Server Error";
    message = parseError(e);
    resolution = "Please try again later";
    status = 500;

    return Response.json(
      { ok: false, error: { title, message, resolution }, data: null },
      { status },
    );
  }
};
