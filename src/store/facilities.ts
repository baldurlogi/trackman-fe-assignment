import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type { Facility } from "@/types";
import {
    lsit as storageList,
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
                const f: Facility = {
                    id: ("id" in fInput ? fInput.id : undefined) ?? crypto.randomUUID(),
                    createdAt:
                        ("createdAt" in fInput ? fInput.createdAt : undefined) ?? new Date(),
                    ...(fInput as Facility)
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
                storageRemove(id);
                set(
                    (s) => ({
                        facilities: s.facilities.filter((x) => x.id !== id),
                    }),
                    false,
                    "facilities/remove",
                );
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

