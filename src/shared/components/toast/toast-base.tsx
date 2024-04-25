import { IoClose } from "react-icons/io5";
import Portal from "../portal";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const ToastBase = ({ children, onClose }: Props) => {
  return (
    <Portal portalId="toast-portal">
      <div
        className="relative flex items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow top-3 right-3 dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        {children}
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <IoClose />
        </button>
      </div>
    </Portal>
  );
};

export default ToastBase;
