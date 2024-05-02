import { useParams } from "react-router-dom";
import { CiUser } from "react-icons/ci";

import * as shared from "@/shared";
import * as features from "@/features";

import { useQueryClient } from "@tanstack/react-query";

type Params = {
  user_id: string;
};

const AuthorizationView = () => {
  const { user_id } = useParams<Params>();
  const { data: userData } = shared.useFetchUser(user_id!);
  const { data: sessionData } = shared.useSession();

  const queryClient = useQueryClient();
  const handleSignOut = () => {
    features.auth.signOut().then(() => {
      queryClient.refetchQueries({
        queryKey: [shared.useSession.pk],
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
              src={userData.profile_url}
              alt={userData.username}
              className="w-64 h-64 rounded-full"
            />
          }
          falseRender={
            <div className="w-64 mx-auto text-center">
              <div className="w-64">
                <div className="flex flex-col items-center justify-center w-64 h-64 transition duration-500 bg-gray-200 rounded-full group">
                  <CiUser size={180} />
                </div>
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
            sessionData?.session?.user?.last_sign_in_at ?? ""
          )}
        </span>
      </li>
      <li>
        <span>계정 생성일 </span>
        <span className="font-bold">
          {sessionData?.session?.user?.created_at}
        </span>
      </li>

      <div className="flex justify-center mt-7">
        <shared.Button intent="error" onClick={handleSignOut}>
          로그아웃
        </shared.Button>
      </div>
    </>
  );
};

const UnAuthorizationView = () => {
  const { user_id } = useParams<Params>();
  const { data: userData } = shared.useFetchUser(user_id!);

  if (!userData) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      <shared.If
        condition={!!userData.profile_url}
        trueRender={
          <img
            src={userData.profile_url}
            alt={userData.username}
            className="w-64 h-64 rounded-full"
          />
        }
        falseRender={
          <div className="w-64 mx-auto text-center">
            <div className="w-64">
              <div className="flex flex-col items-center justify-center w-64 h-64 transition duration-500 bg-gray-200 rounded-full group">
                <CiUser size={180} />
              </div>
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
