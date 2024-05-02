import * as shared from "@/shared";
import { useModal } from "../store";

type Props = {
  children: React.ReactNode;
};

const ModalContainer = ({ children }: Props) => {
  const { modals } = useModal();

  const modalRender = () => {
    return modals.map((modal) => {
      return (
        <shared.ModalBase title={modal.title}>{modal.content}</shared.ModalBase>
      );
    });
  };

  return (
    <>
      <shared.Portal portalId={shared.PORTAL_CONSTS.MODAL}>
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full max-h-full overflow-x-hidden overflow-y-auto bg-black/30">
          {modalRender()}
        </div>
      </shared.Portal>
      {children}
    </>
  );
};

export default ModalContainer;
