import { PUBLIC_SITE_URL } from "@/config/env.client";

export const search = async (query: string) => {
  const response = await fetch(
    new URL(`/api/search?query=${query}`, PUBLIC_SITE_URL),
  );
  return response.ok ? response.json() : response.json();
};
