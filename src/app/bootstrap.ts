import { list, replaceAll, STORAGE_KEY } from "@/services/storage";
import { seedFacilities } from "@/data/seed";

const SEEDED_FLAG = "trackman.seeded.v1";

const hasLocalStorage = () =>
    typeof window !== "undefined" && "localStorage" in window;

export function ensureSeed() {
    if (!hasLocalStorage()) return;

    if (window.localStorage.getItem(SEEDED_FLAG) === "true") return;

    const hasAny = list().length > 0;
    if (!hasAny) {
        replaceAll(seedFacilities);
        window.localStorage.setItem(SEEDED_FLAG, "true");
    }

    window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY && e.newValue === null) {
            window.localStorage.removeItem(SEEDED_FLAG);
        }
    });
}