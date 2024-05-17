import classNames from "classnames";
import * as React from "react";
import * as shared from "@/shared";

type Props = {
  children: React.ReactNode;
};

const ModalContainer = ({ children }: Props) => {
  return (
    <shared.Portal portalId={shared.PORTAL_CONSTS.MODAL}>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full max-h-full overflow-x-hidden overflow-y-auto bg-black/30">
        <div className="absolute w-full max-w-2xl max-h-full p-4">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {children}
          </div>
        </div>
      </div>
    </shared.Portal>
  );
};

const ModalHeader = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 border-solid rounded-t md:p-5">
      <h3 className="text-xl font-semibold text-gray-900">{children}</h3>
    </div>
  );
};

const ModalButton = ({
  children,
  onClick,
  disabled,
  type = "normal",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "accept" | "normal" | "decline";
}) => {
  const TYPE_CLASSNAME = {
    accept: "bg-blue-700 hover:bg-blue-800 text-white",
    decline: "bg-red-700 hover:bg-red-800 text-white",
    normal: "bg-white hover:bg-gray-200 text-black border border-gray-200",
  };

  return (
    <button
      onClick={onClick}
      data-modal-hide="default-modal"
      disabled={disabled}
      type="button"
      className={classNames(
        "focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition ease-in-out",
        TYPE_CLASSNAME[type],
        "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
      )}
    >
      {children}
    </button>
  );
};

const ModalContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4">{children}</div>;
};

const ModalFooter = ({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) => {
  const ALIGN_CLASSNAME = {
    left: "justify-start",
    right: "justify-end",
  };

  return (
    <div
      className={classNames(
        "flex items-center p-4 border-t border-gray-200 border-solid rounded-b items md:p-5",
        ALIGN_CLASSNAME[align]
      )}
    >
      {children}
    </div>
  );
};

const Modal = Object.assign(ModalContainer, {
  Header: ModalHeader,
  Button: ModalButton,
  Content: ModalContent,
  Footer: ModalFooter,
});

export default Modal;
