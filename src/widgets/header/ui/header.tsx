import { Skeleton, If, useSession, useFetchUser } from "@/shared";
import { Suspense } from "react";
import { LuSearch } from "react-icons/lu";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useToastStore } from "@/app/store";

const UserDivision = () => {
  const { data } = useSession();
  const { data: userData } = useFetchUser(data.session?.user.id ?? "");
  const navigate = useNavigate();

  const BUTTON_CLASSNAME =
    "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  return (
    <li>
      <If
        condition={!!data.session}
        trueRender={
          <img
            src={userData?.profile_url}
            className="w-8 h-8 rounded-full shadow-sm cursor-pointer"
            alt={userData?.username}
            onClick={() => {
              navigate(`/profile/${data.session?.user.id}`);
            }}
          />
        }
        falseRender={
          <button
            type="button"
            className={BUTTON_CLASSNAME}
            onClick={() => {
              navigate("/auth/sign-in");
            }}
          >
            로그인
          </button>
        }
      />
    </li>
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
        <span className="ml-5 text-base italic font-semibold text-center text-slate-900">
          새로운 테크블로그, 여기서 시작하세요.
        </span>
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
          <UserDivision />
        </Suspense>
      </ul>
    </header>
  );
}

export default Header;
