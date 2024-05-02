import * as shared from "@/shared";
import * as React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClickAccept?: () => void;
  onClickDecline?: () => void;
  onClose?: () => void;
  hasCloseButton?: boolean;
  hasAccepButton?: boolean;
  hasDeclineButton?: boolean;
};

const ModalBase = ({
  title,
  children,
  onClick,
  hasCloseButton,
  hasAccepButton,
  hasDeclineButton,
  onClickAccept,
  onClickDecline,
  onClose,
}: Props) => {
  return (
    <div className="absolute w-full max-w-2xl max-h-full p-4" onClick={onClick}>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>

          <shared.If
            condition={!!hasCloseButton}
            trueRender={
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            }
          />
        </div>

        {/* Modal body */}
        <div className="p-4 space-y-4 md:p-5">{children}</div>

        {/* Modal footer */}
        <div className="flex items-center p-4 border-t border-gray-200 rounded-b md:p-5 dark:border-gray-600">
          <shared.If
            condition={!!hasAccepButton}
            trueRender={
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onClickAccept}
              >
                I accept
              </button>
            }
          />

          <shared.If
            condition={!!hasDeclineButton}
            trueRender={
              <button
                data-modal-hide="default-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={onClickDecline}
              >
                Decline
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ModalBase;
