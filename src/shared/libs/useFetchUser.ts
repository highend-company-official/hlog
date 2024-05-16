import { useSuspenseQuery } from "@tanstack/react-query";
import { type UserType, supabase } from "@/shared";
import * as shared from "@/shared";

export const fetchUser = (userId: string) => {
  return supabase
    .from("profiles")
    .select(
      `
        id,
        email,
        username,
        profile_url,
        description
      `
    )
    .match({ id: userId })
    .throwOnError()
    .single<UserType>();
};

const useFetchUser = (userId: string) => {
  const queryKey = [shared.QUERY_CONSTS.USER, userId];
  const queryFn = async () => {
    const resposne = await fetchUser(userId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

useFetchUser.pk = shared.QUERY_CONSTS.USER;
export default useFetchUser;
