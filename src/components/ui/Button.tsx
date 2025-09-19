type ButtonProps = {
  id: string;
  title?: string;
  icon?: React.ReactNode;
  containerClass?: string;
}

const Button = ({ title, id, icon, containerClass }: ButtonProps) => {
  return (
    <button
      id={id}
      className={`rounded-md mx-0.5 px-6 py-2 font-bold ${containerClass}`}
    >
      <span>
        <div>
          {icon}
          {title}
        </div>
      </span>
    </button>
  )
}

export default Button