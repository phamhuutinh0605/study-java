export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (filter: string) => [...movieKeys.lists(), filter] as const,
  featured: () => [...movieKeys.all, "featured"] as const,
  trending: () => [...movieKeys.all, "trending"] as const,
  byCategory: (slug: string) => [...movieKeys.all, "category", slug] as const,
  search: (query: string) => [...movieKeys.all, "search", query] as const,
  detail: (id: number) => [...movieKeys.all, "detail", id] as const,
  categories: ["categories"] as const,
};
