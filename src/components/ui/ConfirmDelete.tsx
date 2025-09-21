import { useRef } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import type { ConfirmDeleteProps } from "@/types";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { createPortal } from "react-dom";

function CloseIconButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      id="close"
      type="button"
      aria-label="Close dialog"
      onClick={onClick}
      icon={<X size={24} />}
      variant="ghost"
      containerClass="absolute top-3 right-3 h-8 w-8 items-center justify-center rounded bg-grey-100 text-grey-600 hover:bg-grey-200 focus-visible:ring-2 focus-visible:ring-orange-400"
    />
  );
}

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

  useFocusTrap(open, () => onOpenChange(false), dialogRef, cancelRef);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center">
      {/* overlay */}
      <button
        aria-hidden="true"
        tabIndex={-1}
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
          <CloseIconButton onClick={() => onOpenChange(false)} />

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
              ref={cancelRef}
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
