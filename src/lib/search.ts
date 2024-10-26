export async function handleSearch(query: string) {
  const response = await fetch(
    new URL(`/api/search?query=${query}`, import.meta.env.SITE),
  );
  if (!response.ok) return response.json();
  return response.json();
}
