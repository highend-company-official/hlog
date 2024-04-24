import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from ".";

export const useSession = () => {
  const queryKey = ["session"];
  const queryFn = async () => {
    const resposne = await supabase.auth.getSession();
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};
