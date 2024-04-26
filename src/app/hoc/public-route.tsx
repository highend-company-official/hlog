import { useSession } from "@/shared";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const { data } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.session) {
      navigate("/");
    }
  }, [data.session, navigate]);

  return <>{children}</>;
};

export default PublicRoute;
