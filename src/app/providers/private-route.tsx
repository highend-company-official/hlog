import * as React from "react";
import { useNavigate } from "react-router-dom";

import { useSession } from "@/shared";

import { useToastStore } from "../model";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data: session, isFetching } = useSession();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isFetching && !session) {
      addToast({
        type: "warning",
        content: "로그인이 필요한 서비스입니다.",
        staleTime: 5000,
        hasCloseButton: true,
      });
      navigate("/auth/sign-in", { replace: true });
    }
  }, [addToast, session, isFetching, navigate]);

  if (session) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateRoute;
