import { supabase } from "@/shared";
import * as React from "react";
import useAuth from "../store/auth";

type Props = {
  children: React.ReactNode;
};

const AuthContainer = ({ children }: Props) => {
  const { updateSession } = useAuth();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <>{children}</>;
};

export default AuthContainer;
