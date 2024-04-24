import { supabase, useSession } from "@/shared";
import * as React from "react";
import useAuth from "../store/auth";

type Props = {
  children: React.ReactNode;
};

const AuthContainer = ({ children }: Props) => {
  // Auth Event Handlers
  React.useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // do something...
    });
  }, []);

  return <>{children}</>;
};

export default AuthContainer;
