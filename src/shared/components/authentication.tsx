import { useSession } from "@/shared";

type Props = {
  authenticatedView?: React.ReactNode;
  unauthenticatedView?: React.ReactNode;
};

const Authentication = ({ authenticatedView, unauthenticatedView }: Props) => {
  const { data: session } = useSession();

  if (session) return <>{authenticatedView}</>;
  return <>{unauthenticatedView}</>;
};

export default Authentication;
