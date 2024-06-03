import { useContext, useMemo, useState } from "react";

import { OverlayController } from "../components/overlay-controller";
import { OverlayContext } from "../contexts";

let elementId = 1;

type CreateOverlayElement = (props: {
  isOpen: boolean;
  exit: () => void;
}) => JSX.Element;

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
