import type { Size, Variant } from "@/types";

// BUTTON
export const base =
  "inline-flex items-center justify-center gap-2 font-bold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:opacity-60 disabled:cursor-not-allowed";

export const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-body",
  sm: "h-8 px-3 text-text-s",
};

export const variants: Record<Variant, string> = {
  primary: "text-white bg-orange-400 hover:bg-orange-600 disabled:bg-orange-200",
  secondary: "bg-grey-100 text-grey-800 hover:bg-grey-200",
  ghost: "bg-transparent text-grey-800 hover:bg-grey-100",
  danger: "text-white bg-error hover:bg-[#d51f30]",
};

// CONFIRM DELETE
export const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
