import { forwardRef } from "react";
import type { CheckboxFieldProps } from "@/types";

const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(function CheckboxField(
  { id, label, description, error, className = "", disabled, ...rest },
  ref
) {
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="flex items-start gap-3">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          disabled={disabled}
          aria-invalid={!!error}
          className="mt-1 h-4 w-4 rounded border-grey-200 accent-orange-400 disabled:opacity-60"
          {...rest}
        />
        <span className="flex-1">
          <span className="font-medium text-grey-800">{label}</span>
          {description && <p className="mt-1 text-grey-600">{description}</p>}
          {error && <p className="mt-1 text-error">{error}</p>}
        </span>
      </label>
    </div>
  );
});

export default CheckboxField;
