import * as shared from "@/shared";

import { RiErrorWarningFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdError } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  hasCloseButton: boolean;
  type: "success" | "warning" | "error";
  staleTime?: number;
};

const Success = () => (
  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
    <FaCheckCircle className="w-5 h-5" />
    <span className="sr-only">Check icon</span>
  </div>
);

const Warning = () => (
  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
    <RiErrorWarningFill className="w-5 h-5" />
    <span className="sr-only">Warning icon</span>
  </div>
);

const Error = () => (
  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
    <MdError className="w-5 h-5" />
    <span className="sr-only">Error icon</span>
  </div>
);

const ToastBase = ({
  children,
  onClose,
  hasCloseButton,
  type,
  staleTime,
}: Props) => {
  return (
    <div
      className="relative flex flex-col items-start w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow top-3 right-3"
      role="alert"
    >
      <div className="flex items-center">
        <shared.If condition={type === "success"} trueRender={<Success />} />
        <shared.If condition={type === "warning"} trueRender={<Warning />} />
        <shared.If condition={type === "error"} trueRender={<Error />} />

        <div className="text-sm font-normal ms-3">{children}</div>

        <shared.If
          condition={!!hasCloseButton}
          trueRender={
            <button
              type="button"
              className="absolute right-5 -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
              aria-label="Close"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <IoClose />
            </button>
          }
        />
      </div>

      <shared.If
        condition={!!staleTime}
        trueRender={
          <div className="absolute left-0 bottom-0 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full origin-left animate-[progress-bar_ease-in-out]"
              style={{
                animationDuration: `${staleTime}ms`,
              }}
            />
          </div>
        }
      />
    </div>
  );
};

export default ToastBase;
