import { Fragment, PropsWithChildren } from "react";
import { useOverlayStore } from "../model";

const OverlayContainer = ({ children }: PropsWithChildren) => {
  const { overlayMap } = useOverlayStore();

  return (
    <>
      {children}
      {[...overlayMap.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </>
  );
};

export default OverlayContainer;
