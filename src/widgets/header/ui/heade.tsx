import { LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed left-0 flex items-center justify-between w-full px-10 py-2 bg-white">
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
        <li id="login-btn">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => {
              navigate("/auth/sign-in");
            }}
          >
            로그인
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
