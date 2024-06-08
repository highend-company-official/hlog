import { useSuspenseQuery } from "@tanstack/react-query";

import { profileKeyFactor } from "@/entities/profile";
import * as shared from "@/shared";

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
        link,
        verified
      `
    )
    .match({ id: userId })
    .throwOnError()
    .single<shared.UserType>();
};

const useFetchUser = (userId: string) => {
  const queryKey = profileKeyFactor.detail(userId).queryKey;
  const queryFn = async () => {
    const resposne = await fetchUser(userId);
    return resposne.data;
  };

  return useSuspenseQuery({
    queryKey,
    queryFn,
  });
};

export default useFetchUser;
