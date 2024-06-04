import { useContext, useEffect, useMemo, useState } from "react";

import { OverlayContext } from "../contexts";

let elementId = 1;

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
    // NOTE: requestAnimationFrame이 없으면 가끔 Open 애니메이션이 실행되지 않는다.
    requestAnimationFrame(() => {
      setIsOpenOverlay(true);
    });
  }, []);

  return <OverlayElement isOpen={isOpenOverlay} exit={onExit} />;
};

const useOverlay = () => {
  const context = useContext(OverlayContext);
  const [id] = useState(() => String(elementId++));

  if (context == null) {
    throw new Error("useOverlay is only available within OverlayProvider.");
  }

  const { mount, unmount } = context;

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) =>
        mount(
          id,
          <OverlayController
            key={id}
            overlayElement={overlayElement}
            onExit={() => unmount(id)}
          />
        ),
      exit: () => unmount(id),
    }),
    [id, mount, unmount]
  );
};

export default useOverlay;
