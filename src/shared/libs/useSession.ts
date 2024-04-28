import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from ".";

const KEY = ["session"];

const useSession = () => {
  const queryFn = async () => {
    const resposne = await supabase.auth.getSession();
    return resposne.data;
  };

  return useSuspenseQuery({
    queryKey: KEY,
    queryFn,
  });
};

useSession.pk = KEY;
export default useSession;
