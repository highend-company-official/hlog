import * as ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  portalId: string;
};

const Portal = ({ children, portalId }: Props) => {
  const root = document.getElementById(portalId) as HTMLElement;

  return ReactDOM.createPortal(children, root);
};

export default Portal;
