import React from "react";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    checked?: boolean;
    children?: React.ReactNode;
    id?: string;
  }
>((props, ref) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={props.id}
        type="checkbox"
        ref={ref}
        checked={props.checked}
        onChange={props.onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      {props.children && (
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-black select-none ms-2"
        >
          {props.children}
        </label>
      )}
    </div>
  );
});

export default Checkbox;
