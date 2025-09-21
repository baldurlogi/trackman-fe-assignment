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
  const cancelRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // remember trigger
    lastFocused.current = document.activeElement as HTMLElement | null;

    // focus first interactive control (fallback to dialog)
    setTimeout(() => {
      if (!cancelRef.current) dialogRef.current?.focus();
      else cancelRef.current.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }
      if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
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
      // restore focus to trigger
      lastFocused.current?.focus?.();
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center">
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
        aria-describedby={description ? "confirm-desc" : undefined}
        tabIndex={-1}
        className="relative z-10 w-[min(92vw,720px)] rounded-xl bg-white p-6 shadow-2xl"
      >
        {/* close (X) */}
        <Button
          id="close"
          type="button"
          aria-label="Close dialog"
          onClick={() => onOpenChange(false)}
          icon={<X size={24} />}
          variant="ghost"
          containerClass="absolute top-3 right-3 h-8 w-8 items-center justify-center rounded bg-grey-100 text-grey-600 hover:bg-grey-200 focus-visible:ring-2 focus-visible:ring-orange-400"
        />

        <h3 id="confirm-title" className="text-grey-800">
          {title}
        </h3>

        <div className="-mx-6 my-4 h-px bg-grey-200" />

        {description && (
          <div id="confirm-desc" className="text-grey-800">
            {description}
          </div>
        )}

        <div className="-mx-6 my-4 h-px bg-grey-200" />

        <div className="mt-2 flex justify-end gap-3">
          <Button
            id="confirm-cancel"
            type="button"
            title={cancelLabel}
            variant="secondary"
            containerClass="px-6"
            onClick={() => onOpenChange(false)}
          />
          <Button
            id="confirm-yes"
            type="button"
            title={confirmLabel}
            variant="primary"
            containerClass="px-6"
            disabled={!!confirmDisabled}
            onClick={async () => {
              if (confirmDisabled) return;
              await onConfirm();
              onOpenChange(false);
            }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
