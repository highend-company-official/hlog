import React from "react";

type Props = {
  label?: string;
  children: React.ReactNode;
  onChange?: (type: string) => void;
};

const SelectBox = ({ label, children, onChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange ? onChange(event.target.value) : null;
  };

  return (
    <form className="max-w-sm mx-auto">
      {label ? (
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-black"
        >
          {label}
        </label>
      ) : null}

      <select
        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={handleChange}
      >
        {children}
      </select>
    </form>
  );
};

type OptionProps = {
  value: string;
  selected?: boolean;
  label: string;
};

const Option = ({ value, selected = false, label }: OptionProps) => (
  <option value={value} defaultChecked={selected}>
    {label}
  </option>
);

SelectBox.Option = Option;

export default SelectBox;
