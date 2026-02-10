export const filterByLength = <T extends { title: string }>(
  items: T[],
  order: "asc" | "desc"
): T[] => {
  return [...items].sort((a, b) => {
    const diff = a.title.length - b.title.length;
    return order === "asc" ? diff : -diff;
  });
};