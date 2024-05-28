import { LuSearch } from "react-icons/lu";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import defaultProfile from "@/shared/assets/default-profile.jpg";
import { useToastStore } from "@/app/model";
import {
  useSession,
  useFetchUser,
  useBucket,
  isProviderURL,
  Authentication,
  Button,
  Skeleton,
} from "@/shared";
import { Suspense } from "react";

const AuthenticatedView = () => {
  const navigate = useNavigate();
  const { read } = useBucket("profiles");
  const { data: session } = useSession();
  const { data: userData } = useFetchUser(session?.user.id ?? null);

  return (
    <img
      src={
        userData?.profile_url
          ? isProviderURL(userData?.profile_url)
            ? userData?.profile_url
            : read(userData?.profile_url)
          : defaultProfile
      }
      className="object-cover w-8 h-8 rounded-full shadow-sm cursor-pointer"
      alt={userData?.username}
      onClick={() => {
        navigate(`/profile/${session?.user.id}`);
      }}
    />
  );
};

const UnAuthenticatedView = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      onClick={() => {
        navigate("/auth/sign-in");
      }}
    >
      로그인
    </Button>
  );
};

function Header() {
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  return (
    <header className="fixed left-0 z-40 flex items-center justify-between w-full px-10 py-5 bg-white drop-shadow-sm">
      <div className="flex items-end">
        <h1 className="text-2xl font-semibold">
          <Link to="/">
            <span className="relative inline-block before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-primary">
              <span className="relative text-white">HLOG</span>
            </span>
          </Link>
        </h1>
        <h2 className="ml-5 text-base font-semibold text-center text-slate-700">
          "New tech blog, start here."
        </h2>
      </div>

      <ul className="flex items-center">
        <li id="search">
          <div
            className="mr-8 cursor-pointer"
            onClick={() => {
              addToast({
                type: "warning",
                content: "검색 기능은 구현중입니다.",
                staleTime: 3000,
                hasCloseButton: false,
              });
            }}
          >
            <LuSearch size={24} />
          </div>
        </li>

        <li id="write">
          <div
            className="mr-8 cursor-pointer"
            onClick={() => navigate("/article-write")}
          >
            <FaPen size={24} />
          </div>
        </li>

        <Suspense fallback={<Skeleton width={150} height={40} />}>
          <Authentication
            authenticatedView={<AuthenticatedView />}
            unauthenticatedView={<UnAuthenticatedView />}
          />
        </Suspense>
      </ul>
    </header>
  );
}

export default Header;
