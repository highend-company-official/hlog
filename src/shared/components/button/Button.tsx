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
  return (
    <button
      {...props}
      className={classnames(
        "my-1 w-full px-2 py-3 rounded-lg cursor-pointer",
        INTENT_CLASSNAMES[intent]
      )}
    >
      {children}
    </button>
  );
}

export default Button;
