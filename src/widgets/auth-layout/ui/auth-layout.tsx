import { useSession } from "@/shared";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div className="h-screen bg-white">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
