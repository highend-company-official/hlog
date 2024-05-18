import { useRef } from "react";
import { contextHelper, useOutsideClick, If } from "@/shared";

const { Provider: DropdownProvider, context: dropdownContext } =
  contextHelper.createContextProviderWithState<boolean>(false);
const useDropdownContext = () =>
  contextHelper.useProtectedContext(dropdownContext);

const Dropdown = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  return (
    <DropdownProvider>
      <DropdownContainer onClose={onClose}>{children}</DropdownContainer>
    </DropdownProvider>
  );
};

const DropdownContainer = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  const [, setIsOpen] = useDropdownContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const setClose = () => setIsOpen(false);

  useOutsideClick(dropdownRef, () => {
    setClose();
    onClose?.();
  });

  return (
    <div ref={dropdownRef} className="relative">
      {children}
    </div>
  );
};

const Menu = ({
  children,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  const [isOpen] = useDropdownContext();

  return (
    <div className="mt-2">
      <If
        condition={isOpen}
        trueRender={
          <div className="absolute z-10 transform -translate-x-1/2 divide-y divide-gray-100 rounded-lg shadow bg-slate-50 w-60 left-1/2 top-full">
            <ul className="p-3 space-y-1 text-sm text-gray-700">{children}</ul>
          </div>
        }
      />
    </div>
  );
};

type TriggerProps = {
  children?: React.ReactNode;
};

const Trigger = ({ children }: TriggerProps) => {
  const [, setIsOpen] = useDropdownContext();
  return (
    <button
      className="text-white bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
      className="block px-4 py-2 cursor-pointer hover:bg-black/10"
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
    </li>
  );
};

export default Object.assign(Dropdown, {
  Item,
  Menu,
  Trigger,
  useDropdownContext,
});
