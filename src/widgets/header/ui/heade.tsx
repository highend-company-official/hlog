import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";

import * as shared from "@/shared";

function Header() {
  return (
    <header className="fixed left-0 bg-white w-full flex justify-between items-center px-10 py-2">
      <div className="flex items-end">
        <h1 className="font-['Jersey15Charted'] text-6xl">
          <Link to="/">HLOG</Link>
        </h1>
        <h2> : dont you worry baby</h2>
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
          <shared.Button
            type="button"
            onClick={() => {
              console.log("Feature Login");
            }}
          >
            로그인
          </shared.Button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
