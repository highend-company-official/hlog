type Props = {
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  label?: string;
};

const Switch = ({ name, checked, disabled, onChange, label }: Props) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        name={name}
        type="checkbox"
        value=""
        className="sr-only peer"
        disabled={disabled}
        onChange={onChange}
        checked={checked}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600" />
      <span className="text-sm font-medium text-gray-900 select-none ms-3">
        {label}
      </span>
    </label>
  );
};

export default Switch;
