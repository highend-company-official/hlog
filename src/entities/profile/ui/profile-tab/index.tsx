import { NavLink, useParams } from "react-router-dom";

import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import classNames from "classnames";
import { If, useIsMySession } from "@/shared";

type Props = {
  user_id: string;
};

const ProfileTab = ({ children }: { children: React.ReactNode }) => {
  const { user_id } = useParams<Props>();
  const activeClassname = "text-white bg-primary";
  const { isMySession } = useIsMySession(user_id!);

  return (
    <div className="md:flex">
      <ul className="w-full mb-4 space-y-4 text-sm font-medium text-gray-500 flex-column space-y md:me-4 md:mb-0 md:w-72">
        <li>
          <NavLink
            to=""
            className={({ isActive }) =>
              classNames("flex items-center w-full px-4 py-3 rounded-lg", {
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
              classNames("flex items-center w-full px-4 py-3 rounded-lg", {
                [activeClassname]: isActive,
              })
            }
          >
            <MdOutlineArticle size={16} className="mr-1" />
            아티클
          </NavLink>
        </li>
        <If
          condition={isMySession}
          trueRender={
            <li>
              <NavLink
                to="settings"
                end
                className={({ isActive }) =>
                  classNames("flex items-center w-full px-4 py-3 rounded-lg", {
                    [activeClassname]: isActive,
                  })
                }
              >
                <IoMdSettings size={16} className="mr-1" />
                설정
              </NavLink>
            </li>
          }
        />
      </ul>
      <div className="w-full p-6 text-gray-500 rounded-lg bg-gray-50 text-medium">
        {children}
      </div>
    </div>
  );
};

export default ProfileTab;
