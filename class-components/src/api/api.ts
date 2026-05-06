import type { SearchResult } from '../types/types';

export interface ApiCharacter {
  id: number;
  name: string;
  species: string;
  image: string;
  status: string;
}

export async function fetchItems(
  query?: string,
  page: number = 1
): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    page: String(page),
    ...(query?.trim() ? { name: query.trim() } : {}),
  });

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?${params}`
  );

  if (!res.ok) {
    throw new Error(`Server Error: ${res.status}`);
  }

  const data: { results: ApiCharacter[] | null } = await res.json();

  return (data.results || []).map((char) => ({
    id: char.id,
    name: char.name,
    description: `${char.species}`,
    image: char.image,
  }));
}
