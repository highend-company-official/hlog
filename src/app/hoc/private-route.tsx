import * as React from "react";
import { useNavigate } from "react-router-dom";

import { useSession } from "@/shared";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data, isFetching } = useSession();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isFetching && !data.session) {
      navigate("/", { replace: true });
    }
  }, [data, isFetching, navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
