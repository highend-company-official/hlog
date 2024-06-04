import { useSuspenseQuery } from "@tanstack/react-query";

import * as shared from "@/shared";
import ProfileQueryKey from "@/entities/profile/constants/query-key-factor";

const fetchUser = (userId: string) => {
  return shared.supabase
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
    .single<shared.UserType>();
};

const useFetchUser = (userId: string | null) => {
  const queryKey = ProfileQueryKey.user(userId);
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

export default useFetchUser;
