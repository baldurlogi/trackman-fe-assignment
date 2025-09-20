export const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export function minutesFromHHMM(hhmm: string): number | null {
    if (!TIME_REGEX.test(hhmm)) return null;
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
}

export function getNowMinutes(d: Date = new Date()): number {
    return d.getHours() * 60 + d.getMinutes();
}

export function isOpenAt(nowMinutes: number, openingTime: string, closingTime: string): boolean {
    const open = minutesFromHHMM(openingTime);
    const close = minutesFromHHMM(closingTime);
    if (open === null || close === null || open === close) return false;
    if (open > close) return nowMinutes >= open && nowMinutes < close;
    return nowMinutes >= open || nowMinutes < close;
}

export function getStatus(openingTime: string, closingTime: string, at: Date = new Date()) {
    return isOpenAt(getNowMinutes(at), openingTime, closingTime) ? "open" : "closed";
}