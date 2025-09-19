import type { Facility } from "@/types";

export const STORAGE_KEY = "trackman.facilities.v1" as const;
const VERSION = 1 as const;

type DB = {
    facilities: Facility[];
    version: typeof VERSION;
};

let memoryDB: DB | null = null;

const hasLocalStorage = () =>
    typeof window !== "undefined" && "localStorage" in window;

export function read(): DB | null {
    try {
        if (hasLocalStorage()) {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw) as Partial<DB>;
            if (
                parsed &&
                typeof parsed.version === "number" &&
                Array.isArray(parsed.facilities)
            ) {
                return { facilities: parsed.facilities as Facility[], version: VERSION};
            }
            return null;
        }
        return memoryDB;
    } catch {
        return null;
    }
}

export function write(db: DB): void {
    try {
        if (hasLocalStorage()) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
        } else {
            memoryDB = db;
        }
    } catch {
        return;
    }
}

function ensure(): DB {
    const db = read();
    if (db) return db;
    const fresh: DB = { facilities: [], version: VERSION };
    write(fresh);
    return fresh;
}

export function list(): Facility[] {
    return ensure().facilities.slice();
}

export function getById(id: string): Facility | undefined {
    return ensure().facilities.find((f) => f.id === id);
}

export function create(f: Facility): Facility {
    const db = ensure();
    if (db.facilities.some((x) => x.id == f.id)) {
        throw new Error(`Facility with id "${f.id}" already exists`);
    }
    const next: DB = { ...db, facilities: [ ...db.facilities, f] };
    write(next);
    return f;
}

export function update(id: string, patch: Partial<Facility>): Facility {
    const db = ensure();
    const idx = db.facilities.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error(`Facility "${id}" not found`);
    const updated: Facility = { ...db.facilities[idx], ...patch };
    const nextFacilities = db.facilities.slice();
    nextFacilities[idx] = updated;
    write({ ...db, facilities: nextFacilities });
    return updated;
}

export function remove(id: string): void {
    const db = ensure();
    const nextFacilities = db.facilities.filter((f) => f.id !== id);
    write({ ...db, facilities: nextFacilities });
}

export function replaceAll(next: Facility[]): void {
    const db = ensure();
    write({ ...db, facilities: next });
}