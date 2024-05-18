import { contextHelper, useOutsideClick } from "@/shared/libs";
import { useRef } from "react";
import { If } from "..";

type Props = {
  children: React.ReactNode;
};

const { Provider, context } =
  contextHelper.createContextProviderWithState<boolean>(false);

const Dropdown = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};

const Menu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = contextHelper.useProtectedContext(context);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, (event) => {
    event.stopPropagation();
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef}>
      <If
        condition={isOpen}
        trueRender={
          <div className="absolute z-10 transform -translate-x-1/2 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 left-1/2">
            <ul className="p-3 space-y-1 text-sm text-gray-700">{children}</ul>
          </div>
        }
      />
    </div>
  );
};

type TriggerProps = {
  children: React.ReactNode;
};

const Trigger = ({ children }: TriggerProps) => {
  const [, setIsOpen] = contextHelper.useProtectedContext(context);
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      type="button"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {children ? children : "기본 트리거"}
    </button>
  );
};

type ItemProps<T> = {
  value: T;
  onClick: (value: T) => void;
  children: React.ReactNode;
};

const Item = <T,>({ onClick, children, value }: ItemProps<T>) => {
  return (
    <li
      className="block px-4 py-2 cursor-pointer hover:bg-black/10 "
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
    </li>
  );
};

Dropdown.Item = Item;
Dropdown.Menu = Menu;
Dropdown.Trigger = Trigger;
export default Dropdown;
