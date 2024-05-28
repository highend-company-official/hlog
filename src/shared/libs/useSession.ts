import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from ".";
import * as shared from "@/shared";

const useSession = () => {
  const queryFn = async () => {
    const resposne = await supabase.auth.getSession();
    return resposne.data;
  };

  return useSuspenseQuery({
    queryKey: [shared.QUERY_CONSTS.SESSION],
    queryFn,
    select: (data) => data.session,
  });
};

useSession.pk = [shared.QUERY_CONSTS.SESSION];

export default useSession;
