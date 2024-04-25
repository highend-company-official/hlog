import { supabase } from "@/shared";
import * as React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthContainer = ({ children }: Props) => {
  // Auth Event Handlers
  React.useEffect(() => {
    supabase.auth.onAuthStateChange(() => {
      // do something...
    });
  }, []);

  return <>{children}</>;
};

export default AuthContainer;
