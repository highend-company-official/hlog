import { NavLink } from "react-router-dom";

import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import classNames from "classnames";

const ProfileTab = ({ children }: { children: React.ReactNode }) => {
  const activeClassname = "text-white bg-blue-700";

  return (
    <div className="md:flex">
      <ul className="mb-4 space-y-4 text-sm font-medium text-gray-500 w-72 flex-column space-y dark:text-gray-400 md:me-4 md:mb-0">
        <li>
          <NavLink
            to=""
            className={({ isActive }) =>
              classNames("flex items-center w-full px-4 py-3  rounded-lg", {
                [activeClassname]: isActive,
              })
            }
            end
            aria-current="page"
          >
            <FaRegUserCircle size={16} className="mr-1" />
            프로필
          </NavLink>
        </li>
        <li>
          <NavLink
            to="articles"
            end
            className={({ isActive }) =>
              classNames("flex items-center w-full px-4 py-3  rounded-lg", {
                [activeClassname]: isActive,
              })
            }
          >
            <MdOutlineArticle size={16} className="mr-1" />
            아티클
          </NavLink>
        </li>
        <li>
          <NavLink
            to="settings"
            end
            className={({ isActive }) =>
              classNames("flex items-center w-full px-4 py-3  rounded-lg", {
                [activeClassname]: isActive,
              })
            }
          >
            <IoMdSettings size={16} className="mr-1" />
            설정
          </NavLink>
        </li>
      </ul>
      <div className="w-full p-6 text-gray-500 rounded-lg bg-gray-50 text-medium dark:text-gray-400 dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
};

export default ProfileTab;
