import { Skeleton, If, useSession } from "@/shared";
import { Suspense } from "react";
import { LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const UserDivision = () => {
  const { data } = useSession();
  const navigate = useNavigate();

  const buttonClassName =
    "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  if (!data) return null;

  return (
    <li>
      <If
        condition={!!data}
        trueRender={
          <button
            type="button"
            className={buttonClassName}
            onClick={() => {
              navigate("/profile");
            }}
          >
            {data.session?.user.user_metadata.username}
          </button>
        }
        falseRender={
          <button
            type="button"
            className={buttonClassName}
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
  return (
    <header className="fixed left-0 z-50 flex items-center justify-between w-full px-10 py-2 bg-white">
      <div className="flex items-end">
        <h1 className="text-6xl font-['Jersey15-Regular']">
          <Link to="/">HLOG</Link>
        </h1>
      </div>

      <ul className="flex items-center">
        <li id="search">
          <div
            className="mr-8"
            onClick={() => {
              console.log("Feature Search");
            }}
          >
            <LuSearch size={30} />
          </div>
        </li>

        <Suspense fallback={<Skeleton width={150} />}>
          <UserDivision />
        </Suspense>
      </ul>
    </header>
  );
}

export default Header;
