import type { Facility } from "@/types";

export function sortFacilities(list: Facility[]): Facility[] {
  if (list.length === 0) return list;
  const arr = [...list];

  // stable order for non-defaults: by name (or change to createdAt)
  arr.sort((a, b) => a.name.localeCompare(b.name));

  const idx = arr.findIndex((f) => f.isDefault);
  if (idx > 0) {
    const [d] = arr.splice(idx, 1);
    arr.unshift(d);
  }
  return arr;
}
