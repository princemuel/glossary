import { DATABASE_URL } from "@/config/env.server";
import { parseError } from "@/helpers/error";
import { merge } from "@/helpers/merge";
import { escape_regex } from "@/helpers/utils";
import { config } from "@/lib/constants";

import { data } from "react-router";

import type { Result } from "@/schema/schema";
import type { Route } from "./+types/api.search";

type ResponseErr = {
  title: string;
  message: string;
  resolution: string;
  status: number;
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  let query = (url.searchParams.get(config.searchParam) ?? "").trim();
  query = escape_regex(query).trim();
  if (!query) throw new Error("Whoops, can't be empty");

  try {
    const response = await fetch(new URL(`en/${query}`, DATABASE_URL));
    if (!response.ok) {
      const e = (await response.json()) as ResponseErr;
      e.status = response.status;
      throw e;
    }

    const result = await response.json();
    return data({
      ok: true,
      data: merge(result) as NonNullable<Result["data"]>,
      error: null,
    });
  } catch (error) {
    let status = 400;
    let title = "";
    let message = "";
    let resolution = "";

    //@ts-expect-error
    if ("resolution" in error) {
      const ex = error as ResponseErr;
      title = ex.title;
      message = ex.message;
      resolution = ex.resolution;
      status = ex.status;
      return data(
        { ok: false, error: { title, message, resolution }, data: null },
        { status },
      );
    }

    title = "Unexpected Server Error";
    message = parseError(error);
    resolution = "Please try again later";
    status = 500;

    return data(
      { ok: false, error: { title, message, resolution }, data: null },
      { status },
    );
  }
}
