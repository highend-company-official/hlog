import classnames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "success" | "error" | "normal";
}

const INTENT_CLASSNAMES = {
  primary: "bg-primary text-white",
  error: "bg-error text-white",
  success: "bg-success text-white",
  normal: "text-white bg-gray-800",
};

function Button({ intent = "primary", children, ...props }: ButtonProps) {
  const baseClasses =
    "cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5";

  return (
    <button
      {...props}
      className={classnames(
        baseClasses,
        INTENT_CLASSNAMES[intent],
        props.className,
        "transition ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
      )}
    >
      {children}
    </button>
  );
}

export default Button;
