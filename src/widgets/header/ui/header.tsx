import { Skeleton, If, useSession } from "@/shared";
import { Suspense } from "react";
import { LuSearch } from "react-icons/lu";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/app/store";

const UserDivision = () => {
  const { data } = useSession();
  const navigate = useNavigate();

  const BUTTON_CLASSNAME =
    "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  if (!data) return null;

  return (
    <li>
      <If
        condition={!!data.session}
        trueRender={
          <button
            type="button"
            className={BUTTON_CLASSNAME}
            onClick={() => {
              navigate(`/profile/${data.session?.user.id}`);
            }}
          >
            {/* NOTE: Github Provider는 user_name 형식, Email Provider는 username 형식이기 때문 */}
            {(data.session?.user.user_metadata.user_name ||
              data.session?.user.user_metadata.username) ??
              "닉네임이 설정되지 않았습니다 (개발자에게 문의해주세요)"}
          </button>
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
  const { addToast } = useToast();
  const navigate = useNavigate();

  return (
    <header className="fixed left-0 z-40 flex items-center justify-between w-full px-10 py-2 bg-white">
      <div className="flex items-end">
        <h1 className="text-6xl font-['Jersey15-Regular']">
          <Link to="/">HLOG</Link>
        </h1>
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
            <LuSearch size={30} />
          </div>
        </li>

        <li id="write">
          <div
            className="mr-8 cursor-pointer"
            onClick={() => navigate("/article-write")}
          >
            <FaPen size={30} />
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
