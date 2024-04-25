import { useSuspenseQuery } from "@tanstack/react-query";
import { type User, supabase } from "@/shared";

const KEY = "user";

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
    .single<User>();
};

const useFetchUser = (userId: string) => {
  const queryKey = [KEY, userId];
  const queryFn = async () => {
    const resposne = await fetchUser(userId);
    return resposne.data;
  };

  return useSuspenseQuery({ queryKey, queryFn });
};

useFetchUser.pk = KEY;
export default useFetchUser;
