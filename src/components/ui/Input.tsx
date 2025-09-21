import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
  hint?: string;
};

export default function Input({
  id,
  label,
  hint,
  error,
  className = "",
  ...rest
}: Props) {
  // choose border & focus color based on error
  const borderClasses = error
    ? "border-error focus:ring-error"
    : "border-grey-200 focus:ring-orange-400";

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block font-medium text-grey-800">
          {label}
        </label>
      )}

      <input
        id={id}
        aria-invalid={!!error}
        className={`mt-1 w-full rounded-lg border bg-white px-3 py-2
                    text-grey-800 placeholder:text-grey-600/60
                    focus:outline-none focus:ring-2 ${borderClasses} ${className}`}
        {...rest}
      />

      {error ? (
        <p className="mt-1 text-error">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-grey-600">{hint}</p>
      ) : null}
    </div>
  );
}
