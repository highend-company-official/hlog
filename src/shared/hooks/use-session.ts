import { useSuspenseQuery } from "@tanstack/react-query";
import * as shared from "@/shared";
import { authKeyFactor } from "@/entities/auth";

const useSession = () => {
  const queryFn = async () => {
    const resposne = await shared.supabase.auth.getSession();
    return resposne.data;
  };

  return useSuspenseQuery({
    queryKey: authKeyFactor.session.queryKey,
    queryFn,
    select: (data) => data.session,
  });
};

export default useSession;
