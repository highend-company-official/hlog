import classNames from "classnames";
import { forwardRef } from "react";

type Props = {
  isError?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ isError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={classNames(
          "block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-4 outline-none resize-none",
          { "border-error": isError }
        )}
        {...props}
      />
    );
  }
);

export default TextArea;
