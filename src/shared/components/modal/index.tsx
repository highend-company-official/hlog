import classNames from "classnames";
import * as React from "react";

type Props = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const ModalBase = ({ children, onClick }: Props) => {
  return (
    <div className="absolute w-full max-w-2xl max-h-full p-4" onClick={onClick}>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        {children}
      </div>
    </div>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 border-solid rounded-t md:p-5">
      <h3 className="text-xl font-semibold text-gray-900">{children}</h3>
    </div>
  );
};

const Button = ({
  children,
  onClick,
  type = "normal",
}: {
  children: React.ReactNode;
  onClick?: () => void;
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
      type="button"
      className={classNames(
        "focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
        TYPE_CLASSNAME[type]
      )}
    >
      {children}
    </button>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4">{children}</div>;
};

const Footer = ({
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

ModalBase.Header = Header;
ModalBase.Button = Button;
ModalBase.Content = Content;
ModalBase.Footer = Footer;

export default ModalBase;
