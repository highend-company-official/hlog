import * as React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../store/auth";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { session } = useAuth();

  // TODO: Loading 상태 구현하기
  if (!session) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
