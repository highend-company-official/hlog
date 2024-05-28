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
        description,
        phone,
        link
      `
    )
    .match({ id: userId })
    .throwOnError()
    .single<UserType>();
};

const useFetchUser = (userId: string | null) => {
  const queryKey = useFetchUser.pk(userId);
  const queryFn = async () => {
    if (!userId) {
      return null;
    }
    const resposne = await fetchUser(userId);
    return resposne.data;
  };

  return useSuspenseQuery({
    queryKey,
    queryFn,
  });
};

useFetchUser.pk = (userId: string | null) => [shared.QUERY_CONSTS.USER, userId];

export default useFetchUser;
