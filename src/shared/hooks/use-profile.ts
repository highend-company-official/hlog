import { isProviderURL, useBucket, type UserType } from "@/shared";
import defaultProfile from "@/shared/assets/default-profile.jpg";

import useFetchUser from "./use-fetch-user";

const useProfile = (userId: string | undefined): UserType | null => {
  const { read: readProfiles } = useBucket("profiles");
  const { data } = useFetchUser(userId);

  if (!data) return null;

  const refinedData: UserType = {
    ...data,
    profile_url: data.profile_url
      ? isProviderURL(data.profile_url)
        ? data.profile_url
        : readProfiles(data.profile_url)
      : defaultProfile,
  };

  return refinedData;
};

export default useProfile;
