import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Facility } from "@/types";
import {
  list as storageList,
  create as storageCreate,
  update as storageUpdate,
  remove as storageRemove,
  replaceAll as storageReplaceAll,
} from "@/services/storage";
import { sortFacilities } from "@/utils/facilities";

type State = {
  facilities: Facility[];
  hydrated: boolean;
};

type Actions = {
  hydrate: () => void;
  create: (f: Facility | Omit<Facility, "id" | "createdAt">) => Facility;
  update: (id: string, patch: Partial<Facility>) => Facility;
  remove: (id: string) => void;
  replaceAll: (next: Facility[]) => void;
  setDefault: (id: string) => void;

  getDefault: () => Facility | undefined;
  getSorted: () => Facility[];
};

export type FacilitiesStore = State & Actions;

export const useFacilitiesStore = create<FacilitiesStore>()(
  devtools(
    (set, get) => ({
      facilities: [],
      hydrated: false,

      // ---- hydration ----
      hydrate() {
        const facilities = storageList();
        set({ facilities, hydrated: true }, false, "facilities/hydrate");
      },

      // ---- create ----
      create(fInput) {
        const { id, createdAt, ...rest } = fInput as Facility;
        const f: Facility = {
          ...rest,
          id: id ?? crypto.randomUUID(),
          createdAt: createdAt ?? new Date(),
        };
        set(
          (s) => ({ facilities: [...s.facilities, f] }),
          false,
          "facilities/create",
        );
        storageCreate(f);
        return f;
      },

      // ---- update ----
      update(id, patch) {
        const updated = storageUpdate(id, patch);
        set(
          (s) => ({
            facilities: s.facilities.map((x) => (x.id === id ? updated : x)),
          }),
          false,
          "facilities/update",
        );
        return updated;
      },

      // ---- remove (auto-reassign default if needed) ----
      remove(id) {
        const curr = get().facilities;
        const target = curr.find((x) => x.id === id);
        if (!target) return;

        const remaining = curr.filter((x) => x.id !== id);

        if (target.isDefault && remaining.length > 0) {
          const next = reassignRandomDefault(remaining);
          storageReplaceAll(next); // atomic
          set({ facilities: next }, false, "facilities/remove+reassignDefault");
        } else {
          storageRemove(id);
          set({ facilities: remaining }, false, "facilities/remove");
        }
      },

      // ---- set default (idempotent) ----
      setDefault(id) {
        const curr = get().facilities;
        const exists = curr.some((f) => f.id === id);
        const already = curr.find((f) => f.isDefault)?.id === id;
        if (!exists || already) return; // no-op

        const next = curr.map((f) => ({ ...f, isDefault: f.id === id }));
        storageReplaceAll(next); // atomic
        set({ facilities: next }, false, "facilities/setDefault");
      },

      // ---- replace all ----
      replaceAll(next) {
        storageReplaceAll(next);
        set({ facilities: next }, false, "facilities/replaceAll");
      },

      // ---- getters (avoid in selectors) ----
      getDefault() {
        return get().facilities.find((f) => f.isDefault);
      },

      getSorted() {
        return sortFacilities(get().facilities)
      },
    }),
    { name: "facilities" },
  ),
);

function reassignRandomDefault(remaining: Facility[]): Facility[] {
  if (remaining.length === 0) return remaining;
  const idx = Math.floor(Math.random() * remaining.length);
  return remaining.map((f, i) => ({ ...f, isDefault: i === idx }));
}
