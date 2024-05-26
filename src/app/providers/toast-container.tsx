import * as shared from "@/shared";
import { useToastStore } from "../store";

type Props = {
  children: React.ReactNode;
};

const ToastContainer = ({ children }: Props) => {
  const { toasts, removeToast } = useToastStore();

  const toastRender = () => {
    return toasts.map((toast) => {
      // auto close
      if (toast.staleTime) {
        setTimeout(() => {
          removeToast(toast.id);
        }, toast.staleTime);
      }

      return (
        <shared.ToastBase
          onClose={() => removeToast(toast.id)}
          staleTime={toast.staleTime}
          key={toast.id}
          hasCloseButton={toast.hasCloseButton ?? true}
          type={toast.type}
        >
          {toast.content}
        </shared.ToastBase>
      );
    });
  };

  return (
    <>
      <shared.Portal portalId={shared.PORTAL_CONSTS.TOAST}>
        {toastRender()}
      </shared.Portal>
      {children}
    </>
  );
};

export default ToastContainer;
