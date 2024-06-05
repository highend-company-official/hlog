import * as shared from "@/shared";

import { useToastStore } from "../model";

type Props = {
  children: React.ReactNode;
};

const ToastContainer = ({ children }: Props) => {
  const { toastMap, unmount } = useToastStore();

  return (
    <>
      <shared.Portal portalId={shared.PORTAL_CONSTS.TOAST}>
        {[...toastMap.entries()].map(([id, toast]) => {
          if (toast.staleTime) {
            setTimeout(() => {
              unmount(id);
            }, toast.staleTime);
          }

          return (
            <shared.ToastBase
              key={id}
              onClose={() => unmount(id)}
              staleTime={toast.staleTime}
              hasCloseButton={toast.hasCloseButton ?? true}
              type={toast.type}
            >
              {toast.content}
            </shared.ToastBase>
          );
        })}
      </shared.Portal>
      {children}
    </>
  );
};

export default ToastContainer;
