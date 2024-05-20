import { useParams } from "react-router-dom";
import defaultProfile from "@/shared/assets/default-profile.jpg";

import * as shared from "@/shared";
import * as features from "@/features";
import { useQueryClient } from "@tanstack/react-query";

type Params = {
  user_id: string;
};

const AuthorizationView = () => {
  const queryClient = useQueryClient();
  const { read } = shared.useBucket("profiles");
  const { user_id } = useParams<Params>();
  const { data: userData } = shared.useFetchUser(user_id!);
  const { data: sessionData } = shared.useSession();

  const handleSignOut = () => {
    features.auth.signOut().then(() => {
      queryClient.refetchQueries({
        queryKey: [shared.QUERY_CONSTS.SESSION],
      });
    });
  };

  if (!userData || !sessionData) return null;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <shared.If
          condition={!!userData.profile_url}
          trueRender={
            <img
              src={read(userData.profile_url)}
              alt={userData.username}
              className="object-cover w-64 h-64 rounded-full select-none"
            />
          }
          falseRender={
            <div className="w-64 mx-auto text-center">
              <div className="w-64">
                <img
                  src={defaultProfile}
                  alt={userData.username}
                  className="object-cover w-64 h-64 rounded-full select-none"
                />
              </div>
            </div>
          }
        />
        <span className="text-2xl mt-7">{userData.username}</span>
        <span>{sessionData.session?.user.email}</span>
      </div>

      <shared.Blockquote>
        <span className="block font-bold">
          아래 정보는 본인에게만 노출되는 정보입니다.
        </span>
      </shared.Blockquote>

      <li>
        <span>최근 로그인한 시간 </span>
        <span className="font-bold">
          {shared.getElapsedTime(
            new Date(sessionData?.session?.user?.last_sign_in_at ?? "")
          )}
        </span>
      </li>
      <li>
        <span>계정 생성일 </span>
        <span className="font-bold">
          {sessionData?.session?.user?.created_at}
        </span>
      </li>

      <div className="flex justify-end">
        <shared.Button className="mt-7" intent="error" onClick={handleSignOut}>
          로그아웃
        </shared.Button>
      </div>
    </>
  );
};

const UnAuthorizationView = () => {
  const { user_id } = useParams<Params>();
  const { data: userData } = shared.useFetchUser(user_id!);
  const { read } = shared.useBucket("profiles");

  if (!userData) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      <shared.If
        condition={!!userData.profile_url}
        trueRender={
          <img
            src={read(userData.profile_url)}
            alt={userData.username}
            className="object-cover w-64 h-64 rounded-full"
          />
        }
        falseRender={
          <div className="w-64 mx-auto text-center">
            <div className="w-64">
              <img
                src={defaultProfile}
                alt={userData.username}
                className="object-cover w-64 h-64 rounded-full select-none"
              />
            </div>
          </div>
        }
      />
      <span className="text-2xl mt-7">{userData.username}</span>
      <span>{userData.email}</span>
    </div>
  );
};

const UserInfo = () => {
  const { user_id } = useParams<Params>();
  const { isMySession } = shared.useIsMySession(user_id!);

  return (
    <shared.If
      condition={isMySession}
      trueRender={<AuthorizationView />}
      falseRender={<UnAuthorizationView />}
    />
  );
};

export default UserInfo;
