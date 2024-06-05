import { useEffect, useMemo, useState } from "react";

import { useOverlayStore } from "@/app/model";
import { generateRandomId } from "../libs";

type CreateOverlayElement = (props: {
  isOpen: boolean;
  exit: () => void;
}) => JSX.Element | null;

interface Props {
  overlayElement: CreateOverlayElement;
  onExit: () => void;
}

const OverlayController = ({
  overlayElement: OverlayElement,
  onExit,
}: Props) => {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpenOverlay(true);
    });
  }, []);

  return <OverlayElement isOpen={isOpenOverlay} exit={onExit} />;
};

const useOverlay = () => {
  const { mount, unmount } = useOverlayStore();

  const newId = generateRandomId();

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) =>
        mount(
          newId,
          <OverlayController
            key={newId}
            overlayElement={overlayElement}
            onExit={() => unmount(newId)}
          />
        ),
      exit: () => unmount(newId),
    }),
    [newId, mount, unmount]
  );
};

export default useOverlay;
