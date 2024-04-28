import { useParams } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import * as shared from "@/shared";
import * as features from "@/features";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/shared";

type Params = {
  user_id: string;
};

const UserInfo = () => {
  const { user_id } = useParams<Params>();
  const queryClient = useQueryClient();
  const { data } = shared.useFetchUser(user_id!);
  const isMyProfile = shared.useIsMySession(user_id!);

  const handleSignOut = () => {
    features.auth.signOut().then(() => {
      queryClient.refetchQueries({
        queryKey: useSession.pk,
      });
    });
  };

  if (!data) return null;

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <shared.If
          condition={!!data.profile_url}
          trueRender={
            <img
              src={data.profile_url}
              alt={data.username}
              className="w-64 h-64 rounded-full"
            />
          }
          falseRender={
            <div className="w-64 mx-auto text-center">
              <div className="w-64">
                <div className="flex flex-col items-center justify-center w-64 h-64 transition duration-500 bg-gray-200 rounded-full cursor-pointer group hover:bg-gray-300 opacity-60">
                  <AiOutlineCloudUpload size={50} />
                  <span>프로필 사진을 업로드해주세요.</span>
                </div>
              </div>
            </div>
          }
        />

        <span className="text-2xl mt-7">{data.username}</span>
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
