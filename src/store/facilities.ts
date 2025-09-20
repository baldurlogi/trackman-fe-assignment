import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type { Facility } from "@/types";
import {
  list as storageList,
  create as storageCreate,
  update as storageUpdate,
  remove as storageRemove,
  replaceAll as storageReplaceAll,
} from "@/services/storage";

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
    subscribeWithSelector((set, get) => ({
      facilities: [],
      hydrated: false,

      hydrate() {
        const facilities = storageList();
        set({ facilities, hydrated: true }, false, "facilities/hydrate");
      },

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

      remove(id) {
        const curr = get().facilities;
        const target = curr.find((x) => x.id === id);
        if (!target) return;

        const remaining = curr.filter((x) => x.id !== id);

        if (target.isDefault && remaining.length > 0) {
          const next = reassignRandomDefault(remaining);
          storageReplaceAll(next);
          set({ facilities: next }, false, "facilities/remove+reassignDefault");
        } else {
          storageRemove(id);
          set({ facilities: remaining }, false, "facilities/remove");
        }
      },

      setDefault(id) {
        const next = get().facilities.map((f) => ({
          ...f,
          isDefault: f.id === id,
        }));

        storageReplaceAll(next);

        set({ facilities: next }, false, "facilities/setDefault");
      },

      replaceAll(next) {
        storageReplaceAll(next);
        set({ facilities: next }, false, "facilities/replaceAll");
      },

      getDefault() {
        return get().facilities.find((f) => f.isDefault);
      },

      getSorted() {
        const arr = get().facilities.slice();
        const idx = arr.findIndex((f) => f.isDefault);
        if (idx > 0) {
          const [d] = arr.splice(idx, 1);
          arr.unshift(d);
        }
        return arr;
      },
    })),
    { name: "facilities" },
  ),
);

function reassignRandomDefault(remaining: Facility[]): Facility[] {
  if (remaining.length === 0) return remaining;
  const idx = Math.floor(Math.random() * remaining.length);
  return remaining.map((f, i) => ({ ...f, isDefault: i === idx }));
}
