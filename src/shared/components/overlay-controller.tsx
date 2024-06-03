import { useEffect, useState } from "react";

type CreateOverlayElement = (props: {
  isOpen: boolean;
  exit: () => void;
}) => JSX.Element | null;

interface Props {
  overlayElement: CreateOverlayElement;
  onExit: () => void;
}
export const OverlayController = ({
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
