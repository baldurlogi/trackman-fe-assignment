import { create } from "zustand";
import type { Facility } from "@/types";
import * as storage from "@/services/storage";

type State = {
    facilities: Facility[];
    hydrated: boolean;
};

type Actions = {
    hydrate: () => void;
    create: (f: Facility) => Facility;
    update: (id: string, patch: Partial<Facility>) => Facility;
    remove: (id: string) => void;
    replaceAll: (next: Facility[]) => void;
    setDefault: (id: string) => void;

    getDefault: () => Facility | undefined;
    getSorted: () => Facility[];
};

export type FacilitiesStore = State & Actions;

export const useFacilitiesStore = create<FacilitiesStore>((set, get) => ({
    facilities: [],
    hydrated: false,

    hydrate() {
        const facilities = storage.list();
        set({ facilities, hydrated: true });
    },

    create(f) {
        storage.create(f);
        set((s) => ({ facilities: [...s.facilities, f] }));
        return f;
    },

    update(id, patch) {
        const updated = storage.update(id, patch);
        set((s) => ({
            facilities: s.facilities.map((f) => (f.id === id ? updated : f)),
        }));
        return updated;
    },

    remove(id) {
        storage.remove(id);
        set((s) => ({ facilities: s.facilities.filter((f) => f.id !== id) }));
    },

    replaceAll(next) {
        storage.replaceAll(next);
        set({ facilities: next });
    },

    setDefault(id) {
        const next = get().facilities.map((f) => ({ ...f, isDefault: f.id === id }));
        storage.replaceAll(next);
        set({ facilities: next });
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
}));