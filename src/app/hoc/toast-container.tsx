import * as shared from "@/shared";
import { useToast } from "../store";

type Props = {
  children: React.ReactNode;
};

const ToastContainer = ({ children }: Props) => {
  const { toasts, removeToast } = useToast();

  const toastRender = () => {
    return toasts.map((toast) => {
      switch (toast.type) {
        case "success":
          return (
            <shared.toasts.Success
              onClose={() => removeToast(toast.id)}
              key={toast.id}
            >
              {toast.content}
            </shared.toasts.Success>
          );
        case "warning":
          return (
            <shared.toasts.Warning
              onClose={() => removeToast(toast.id)}
              key={toast.id}
            >
              {toast.content}
            </shared.toasts.Warning>
          );
        case "error":
          return (
            <shared.toasts.Error
              onClose={() => removeToast(toast.id)}
              key={toast.id}
            >
              {toast.content}
            </shared.toasts.Error>
          );
        default:
          return null;
      }
    });
  };

  return (
    <>
      <shared.Portal portalId="toast-portal">{toastRender()}</shared.Portal>
      {children}
    </>
  );
};

export default ToastContainer;
