import classnames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "success" | "error";
}

const INTENT_CLASSNAMES = {
  primary: "bg-primary text-white",
  error: "bg-error text-white",
  success: "bg-success text-white",
};

function Button({ intent = "primary", children, ...props }: ButtonProps) {
  const baseClasses = "my-1 px-2 py-3 rounded-lg cursor-pointer";

  return (
    <button
      {...props}
      className={classnames(
        baseClasses,
        INTENT_CLASSNAMES[intent],
        props.className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
