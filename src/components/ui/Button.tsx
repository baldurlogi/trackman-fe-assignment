import { type ButtonProps } from "@/types";

const Button = ({ title, id, icon, containerClass }: ButtonProps) => {
  return (
    <button
      id={id}
      className={`rounded-md gap-1 py-2 font-bold ${containerClass}`}
    >
      <span>
        <div>
          {icon}
          {title}
        </div>
      </span>
    </button>
  );
};

export default Button;
