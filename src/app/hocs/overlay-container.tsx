import { Fragment } from "react";
import { useOverlayStore } from "../model";
import { Outlet } from "react-router-dom";

const OverlayContainer = () => {
  const { overlayMap } = useOverlayStore();

  return (
    <>
      <Outlet />
      {[...overlayMap.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </>
  );
};

export default OverlayContainer;
