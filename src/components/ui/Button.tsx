import { type ButtonProps } from "@/types";

const Button = ({ title, id, icon, containerClass, ariaLabel, onClick }: ButtonProps) => {
  return (
    <button
      id={id}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`rounded-md gap-1 p-2 font-bold ${containerClass}`}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {title && <span>{title}</span>}
    </button>
  );
};

export default Button;
