import { forwardRef } from "react";
import type { TextareaProps } from "@/types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, label, hint, error, className = "", rows = 4, ...rest },
  ref
) {
  const border = error ? "border-error focus:ring-error" : "border-grey-200 focus:ring-orange-400";

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block font-medium text-grey-800">
          {label}
        </label>
      )}

      <textarea
        id={id}
        ref={ref}
        rows={rows}
        aria-invalid={!!error}
        className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 text-grey-800
                    placeholder:text-grey-600/60 focus:outline-none focus:ring-2
                    ${border} ${className}`}
        {...rest}
      />

      {error ? (
        <p className="mt-1 text-error">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-grey-600">{hint}</p>
      ) : null}
    </div>
  );
});

export default Textarea;
