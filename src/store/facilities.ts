import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  Facility,
  FacilitiesStore,
  CreateFacilityInput,
} from "@/types";
import {
  list as storageList,
  create as storageCreate,
  update as storageUpdate,
  remove as storageRemove,
  replaceAll as storageReplaceAll,
} from "@/services/storage";
import { sortFacilities } from "@/utils/facilities";

let cachedSorted: Facility[] = [];
let lastFacilities: Facility[] = [];

export const useFacilitiesStore = create<FacilitiesStore>()(
  devtools(
    (set, get) => ({
      facilities: [],
      hydrated: false,

      hydrate() {
        if (get().hydrated) return; // idempotent
        const facilities = storageList();
        set({ facilities, hydrated: true }, false, "facilities/hydrate");
      },

      create(input: CreateFacilityInput) {
        const { id, createdAt, ...rest } = input;
        const f: Facility = {
          ...rest,
          id: id ?? crypto.randomUUID(),
          createdAt: createdAt ?? new Date().toISOString(),
        };
        set(s => ({ facilities: [...s.facilities, f] }), false, "facilities/create");
        storageCreate(f);
        return f;
      },

      update(id, patch) {
        const updated = storageUpdate(id, patch);
        set(s => ({
          facilities: s.facilities.map(x => (x.id === id ? updated : x)),
        }), false, "facilities/update");
        return updated;
      },

      remove(id) {
        const curr = get().facilities;
        const target = curr.find(x => x.id === id);
        if (!target) return;

        const remaining = curr.filter(x => x.id !== id);

        if (target.isDefault && remaining.length > 0) {
          const next = reassignDefaultDeterministic(remaining);
          storageReplaceAll(next);
          set({ facilities: next }, false, "facilities/remove+reassignDefault");
        } else {
          storageRemove(id);
          set({ facilities: remaining }, false, "facilities/remove");
        }
      },

      setDefault(id) {
        const curr = get().facilities;
        if (!curr.some(f => f.id === id)) return;
        if (curr.find(f => f.isDefault)?.id === id) return;

        const next = curr.map(f => ({ ...f, isDefault: f.id === id }));
        storageReplaceAll(next);
        set({ facilities: next }, false, "facilities/setDefault");
      },

      replaceAll(next) {
        storageReplaceAll(next);
        set({ facilities: next }, false, "facilities/replaceAll");
      },

      getDefault() {
        return get().facilities.find(f => f.isDefault);
      },

      getSorted() {
        return sortFacilities(get().facilities);
      },
    }),
    { name: "facilities" },
  ),
);

// stable memoized selector
export const selectSortedFacilities = (s: FacilitiesStore) => {
  if (s.facilities !== lastFacilities) {
    lastFacilities = s.facilities;
    cachedSorted = sortFacilities(s.facilities);
  }
  return cachedSorted;
};

// Prefer deterministic fallback (first by name) over random
function reassignDefaultDeterministic(remaining: Facility[]) {
  if (remaining.length === 0) return remaining;
  const sorted = sortFacilities(remaining);
  const fallbackId = sorted[0].id;
  return remaining.map(f => ({ ...f, isDefault: f.id === fallbackId }));
}