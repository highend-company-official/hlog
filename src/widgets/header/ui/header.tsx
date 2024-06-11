import { Suspense } from "react";
import { FaPen } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

import { useSearchStore } from "@/entities/search";
import {
  useSession,
  Authentication,
  Button,
  Skeleton,
  useProfile,
} from "@/shared";
import { useGetTopNotice } from "@/entities/notice";
import { BiSolidMegaphone } from "react-icons/bi";

const AuthenticatedView = () => {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const profileData = useProfile(session?.user.id);

  return (
    <img
      src={profileData?.profile_url}
      className="object-cover w-8 h-8 rounded-full shadow-sm cursor-pointer"
      alt={profileData?.username}
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
  const { data } = useGetTopNotice();

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

        <div className="flex items-center ml-4">
          {data?.title ? (
            <>
              <div className="bg-primary text-white px-2 py-1 rounded-full mr-1 text-xs">
                공지
              </div>
              <Link className="text-md font-semibold underline" to={`/notice`}>
                {data.title}
              </Link>
            </>
          ) : (
            <span className="text-sm">등록된 공지가 없습니다.</span>
          )}
        </div>
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
