import classNames from "classnames";
import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { useOutsideClick, If, ContextProvideWithState } from "@/shared";

const createContextProviderWithState = <T,>(defaultValue: T) => {
  const context = createContext<ContextProvideWithState<T> | null>(null);

  const Provider = ({ children }: { children: ReactNode }) => {
    const state = useState<T>(defaultValue);
    return <context.Provider value={state}>{children}</context.Provider>;
  };

  return {
    Provider,
    context,
  };
};

const { Provider: DropdownProvider, context: dropdownContext } =
  createContextProviderWithState<boolean>(false);

const Dropdown = ({
  children,
  onClose,
  className,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}) => {
  return (
    <DropdownProvider>
      <DropdownContainer className={className} onClose={onClose}>
        {children}
      </DropdownContainer>
    </DropdownProvider>
  );
};

const DropdownContainer = ({
  children,
  onClose,
  className,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}) => {
  const context = useContext(dropdownContext);

  if (!context) return null;

  const [, setIsOpen] = context;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const setClose = () => setIsOpen(false);

  useOutsideClick(dropdownRef, () => {
    setClose();
    onClose?.();
  });

  return (
    <div
      ref={dropdownRef}
      className={classNames(
        `relative flex items-center justify-center`,
        className
      )}
    >
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
  const context = useContext(dropdownContext);

  if (!context) return null;

  const [isOpen] = context;

  return (
    <If
      condition={isOpen}
      trueRender={
        <div className="absolute z-10 mt-2 transform -translate-x-1/2 divide-y divide-gray-100 rounded-lg shadow bg-slate-50 w-60 left-1/2 top-full">
          <ul className="p-3 space-y-1 text-sm text-gray-700">{children}</ul>
        </div>
      }
    />
  );
};

type TriggerProps = {
  children?: React.ReactNode;
};

const Trigger = ({ children }: TriggerProps) => {
  const context = useContext(dropdownContext);

  if (!context) return null;

  const [, setIsOpen] = context;

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
  context: dropdownContext,
});
