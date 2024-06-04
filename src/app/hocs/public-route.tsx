import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/shared";

type Props = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const { data: session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return <>{children}</>;
};

export default PublicRoute;
