import { Suspense } from "react";
import classNames from "classnames";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { useParams } from "react-router-dom";

import * as shared from "@/shared";
import defaultProfile from "@/shared/assets/default-profile.jpg";

type Params = {
  user_id: string;
};

type BioProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
};

const Bio = ({ label, icon, value }: BioProps) => {
  const { write } = shared.useClipboard();

  return (
    <div className="flex flex-col items-center">
      <button
        disabled={!value}
        className={classNames(
          `flex items-center justify-center w-10 h-10 mx-3 border border-solid rounded-full border-black/30 disabled:cursor-not-allowed font-bold`,
          {
            "bg-primary text-white cursor-pointer": !!value,
          }
        )}
        onClick={() => write(value)}
      >
        {icon}
      </button>
      <span>{label}</span>
    </div>
  );
};

const AuthorizationView = () => {
  const { read } = shared.useBucket("profiles");
  const { user_id } = useParams<Params>();
  const { data: userData } = shared.useFetchUser(user_id!);
  const { data: session } = shared.useSession();
  const { open: openProfileDetail } = shared.useOverlay();

  const handleOpenProfileDetail = (url: string) => {
    openProfileDetail(({ isOpen, exit }) => (
      <shared.ImageDetailOverlay open={isOpen} onClose={exit} url={url} />
    ));
  };

  if (!userData || !session) return null;

  const getProfileURL = () =>
    shared.isProviderURL(userData.profile_url)
      ? userData.profile_url
      : read(userData.profile_url);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <shared.If
          condition={!!userData.profile_url}
          trueRender={
            <img
              src={getProfileURL()}
              onClick={() => handleOpenProfileDetail(getProfileURL())}
              alt={userData.username}
              className="object-cover w-64 h-64 rounded-full select-none cursor-pointer"
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
        <span className="text-2xl mt-7 text-black mb-4">
          {userData.username}
        </span>

        <div className="flex">
          <Bio
            label="Email"
            value={userData.email}
            icon={<MdOutlineMailOutline />}
          />
          <Bio label="Phone" value={userData.phone} icon={<FaPhoneAlt />} />
          <Bio label="Link" value={userData.link} icon={<IoIosLink />} />
        </div>
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
            new Date(session?.user?.last_sign_in_at ?? "")
          )}
        </span>
      </li>
      <li>
        <span>계정 생성일 </span>
        <span className="font-bold">{session?.user?.created_at}</span>
      </li>
    </>
  );
};

const UnAuthorizationView = () => {
  const { user_id } = useParams<Params>();
  const { data: userData } = shared.useFetchUser(user_id!);
  const { read } = shared.useBucket("profiles");
  const { open: openProfileDetail } = shared.useOverlay();

  const handleOpenProfileDetail = (url: string) => {
    openProfileDetail(({ isOpen, exit }) => (
      <shared.ImageDetailOverlay open={isOpen} onClose={exit} url={url} />
    ));
  };

  if (!userData) return null;

  const getProfileURL = () =>
    shared.isProviderURL(userData.profile_url)
      ? userData.profile_url
      : read(userData.profile_url);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <shared.If
          condition={!!userData.profile_url}
          trueRender={
            <img
              src={getProfileURL()}
              onClick={() => handleOpenProfileDetail(getProfileURL())}
              alt={userData.username}
              className="object-cover w-64 h-64 rounded-full cursor-pointer"
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
        <span className="text-2xl mt-7 text-black mb-4">
          {userData.username}
        </span>
        <div className="flex">
          <Bio
            label="Email"
            value={userData.email}
            icon={<MdOutlineMailOutline />}
          />
          <Bio label="Phone" value={userData.phone} icon={<FaPhoneAlt />} />
          <Bio label="Link" value={userData.link} icon={<IoIosLink />} />
        </div>
      </div>
    </>
  );
};

const ProfileInfo = () => {
  const { user_id } = useParams<Params>();
  const { isMySession } = shared.useIsMySession(user_id!);

  return (
    <Suspense fallback={<shared.Skeleton height={600} />}>
      <shared.If
        condition={isMySession}
        trueRender={<AuthorizationView />}
        falseRender={<UnAuthorizationView />}
      />
    </Suspense>
  );
};

export default ProfileInfo;
