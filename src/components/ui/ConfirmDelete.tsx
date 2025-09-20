// src/components/ConfirmDialog.tsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { X } from "lucide-react";

type ConfirmDeleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  confirmDisabled?: boolean;
};

export default function ConfirmDelete({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  confirmDisabled,
}: ConfirmDeleteProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // mount container for portal
  const container = document.body;

  // focus management
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;

    // focus dialog
    setTimeout(() => dialogRef.current?.focus(), 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
      if (e.key === "Tab") {
        // simple trap: keep focus inside dialog
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
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
      // return focus to trigger
      lastFocused.current?.focus?.();
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-hidden={!open}
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => onOpenChange(false)}
      />

      {/* dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        tabIndex={-1}
        className="relative z-10 w-[min(92vw,720px)] max-w-lg rounded-xl text-xl bg-white p-4 shadow-2xl"
      >
        {/* close (X) */}
        <div className="flex items-center justify-between">
          <Button
            id="close"
            aria-label="Close dialog"
            onClick={() => onOpenChange(false)}
            icon={<X size={24} />}
            containerClass="absolute right-2 item-center flex rounded text-gray-500 bg-gray-100"
          />

          <h3 id="confirm-title" className="font-semibold text-gray-900">
            {title}
          </h3>
        </div>

        <div className="-mx-4 my-3 h-px bg-grey-200" />

        {description && (
          <div id="confirm-desc" className="mt-3 text-gray-700">
            {description}
          </div>
        )}

        <div className="-mx-4 my-3 h-px bg-grey-200" />

        <div className="mt-6 flex justify-end gap-2">
          <Button
            id="confirm-cancel"
            title={cancelLabel}
            containerClass="bg-gray-100 text-gray-800 hover:bg-gray-200 px-6"
            onClick={() => onOpenChange(false)}
          />
          <Button
            id="confirm-yes"
            title={confirmLabel}
            containerClass={`text-white px-6 ${confirmDisabled ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"}`}
            onClick={async () => {
              if (confirmDisabled) return;
              await onConfirm();
              onOpenChange(false);
            }}
          />
        </div>
      </div>
    </div>,
    container,
  );
}
