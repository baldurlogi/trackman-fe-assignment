import { useEffect, type RefObject } from "react";
import { FOCUSABLE } from "@/constants";

export function useFocusTrap(
  open: boolean,
  onClose: () => void,
  dialogRef: RefObject<HTMLElement | null>,
  initialRef?: RefObject<HTMLElement | null>,
) {
  // remember trigger to restore focus later
  useEffect(() => {
    if (!open) return;

    const lastFocused = document.activeElement as HTMLElement | null;

    // focus first interactive control (fallback to dialog)
    setTimeout(() => {
      const el = initialRef?.current ?? dialogRef.current;
      el?.focus?.();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!nodes || nodes.length === 0) return;

        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement as HTMLElement;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lastFocused?.focus?.();
    };
  }, [open, onClose, dialogRef, initialRef]);
}
