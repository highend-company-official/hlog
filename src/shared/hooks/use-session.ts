import { useSuspenseQuery } from "@tanstack/react-query";
import * as shared from "@/shared";
import { AuthQueryKey } from "@/entities/auth";

const useSession = () => {
  const queryFn = async () => {
    const resposne = await shared.supabase.auth.getSession();
    return resposne.data;
  };

  return useSuspenseQuery({
    queryKey: AuthQueryKey.session,
    queryFn,
    select: (data) => data.session,
  });
};

export default useSession;
