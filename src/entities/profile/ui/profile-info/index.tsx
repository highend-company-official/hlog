import { useParams } from "react-router-dom";
import * as shared from "@/shared";
import * as features from "@/features";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/shared";

type Params = {
  user_id: string;
};

const UserInfo = () => {
  const { user_id } = useParams<Params>();
  const {
    data: { session },
  } = useSession();
  const queryClient = useQueryClient();
  const { data } = shared.useFetchUser(user_id!);

  const handleSignOut = () => {
    features.auth.signOut().then(() => {
      queryClient.refetchQueries({
        queryKey: useSession.pk,
      });
    });
  };

  if (!data) return null;

  const isMyProfile = session?.user.id === user_id;

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <img
          src={data.profile_url}
          alt={data.username}
          className="rounded-md"
        />
        <span className="text-2xl">{data.username}</span>
      </div>

      {isMyProfile && (
        <div className="flex justify-center">
          <shared.Button intent="error" onClick={handleSignOut}>
            로그아웃
          </shared.Button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
