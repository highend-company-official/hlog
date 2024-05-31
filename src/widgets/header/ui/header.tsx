import { LuSearch } from "react-icons/lu";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import defaultProfile from "@/shared/assets/default-profile.jpg";
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
import useSearchStore from "@/entities/search-input/model";

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
  const navigate = useNavigate();
  const { setIsSearchOpen } = useSearchStore();

  return (
    <header className="fixed left-0 z-40 flex items-center justify-between w-full px-10 py-5 bg-white drop-shadow-sm h-[60px]">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">
          <Link to="/">
            <span className="relative inline-block bg-primary px-2 py-1">
              <span className="relative text-white">HLOG</span>
            </span>
          </Link>
        </h1>
        <span className="ml-5 text-base font-semibold text-center text-gray-700">
          "New tech blog, start here."
        </span>
      </div>

      <ul className="flex items-center">
        <li id="search">
          <div
            className="mr-8 cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
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

        <Suspense
          fallback={
            <>
              <div className="py-5">
                <Skeleton width={150} height={40} />
              </div>
            </>
          }
        >
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
