import type { ButtonProps } from "@/types";
import { base, sizes, variants } from "@/constants";
import { forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    id,
    title,
    icon,
    variant = "secondary",
    size = "md",
    ariaLabel,
    containerClass = "",
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      id={id}
      aria-label={ariaLabel}
      type={type}
      ref={ref}
      className={`${base} ${sizes[size]} ${variants[variant]} ${containerClass}`}
      {...rest}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {title && <span>{title}</span>}
    </button>
  );
});

export default Button;
