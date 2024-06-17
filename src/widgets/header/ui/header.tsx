import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useSearchStore } from "@/entities/search";
import {
  useSession,
  Authentication,
  Button,
  Skeleton,
  useProfile,
  QueryBoundary,
} from "@/shared";
import { useGetTopNotice } from "@/entities/notice";
import { memo } from "react";

const AuthenticatedView = () => {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const profileData = useProfile(session?.user.id);

  return (
    <>
      <li id="write">
        <div
          className="px-2 py-2 mr-8 text-xs text-white rounded-md cursor-pointer bg-primary"
          onClick={() => navigate("/article-write")}
        >
          글 작성
        </div>
      </li>

      <img
        src={profileData?.profile_url}
        className="object-cover w-8 h-8 rounded-full shadow-sm cursor-pointer"
        alt={profileData?.username}
        onClick={() => {
          navigate(`/profile/${session?.user.id}`);
        }}
      />
    </>
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

const NoticeSection = () => {
  const { data } = useGetTopNotice();
  return (
    <div className="flex items-center ml-4 max-md:hidden">
      {data?.title ? (
        <>
          <div className="px-2 py-1 mr-1 text-xs text-white rounded-full bg-primary">
            공지
          </div>
          <Link className="font-semibold underline text-md" to={`/notice`}>
            {data.title}
          </Link>
        </>
      ) : (
        <span className="text-sm">등록된 공지가 없습니다.</span>
      )}
    </div>
  );
};

const Header = memo(() => {
  const { setIsSearchOpen } = useSearchStore();

  return (
    <header className="fixed left-0 z-40 flex items-center justify-between w-full px-10 py-5 bg-white drop-shadow-sm h-[60px]">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">
          <Link to="/">
            <span className="relative inline-block px-2 py-1 bg-primary">
              <span className="relative text-white">HLOG</span>
            </span>
          </Link>
        </h1>

        <QueryBoundary loadingFallback={<Skeleton />}>
          <NoticeSection />
        </QueryBoundary>
      </div>

      <ul className="flex items-center max-md:hidden">
        <li id="search">
          <div
            className="w-[200px] rounded-full bg-black/10 mr-8 cursor-pointer flex px-3 py-2 hover:bg-black/20 transition ease-in-out"
            onClick={() => setIsSearchOpen(true)}
          >
            <span className="text-sm truncate text-black/40">
              검색어를 입력하세요
            </span>
            <FaSearch className="ml-auto text-black" size={16} />
          </div>
        </li>

        <QueryBoundary
          loadingFallback={
            <div className="py-5">
              <Skeleton width={150} height={40} />
            </div>
          }
        >
          <Authentication
            authenticatedView={<AuthenticatedView />}
            unauthenticatedView={<UnAuthenticatedView />}
          />
        </QueryBoundary>
      </ul>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
