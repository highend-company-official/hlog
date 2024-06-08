import classNames from "classnames";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";

import { If, useIsMySession } from "@/shared";
import { Suspense } from "react";

type Props = {
  user_id: string;
};

const setLinkClassName = (isActive: boolean) =>
  classNames("flex items-center w-full p-4 mb-4 rounded-l-lg rounded-xl", {
    "bg-black/10 text-black font-semibold": isActive,
    "bg-white text-subTitle": !isActive,
  });

const PrivateNavLink = ({
  label,
  to,
  icon,
}: {
  label: string;
  to: string;
  icon: React.ReactNode;
}) => {
  const { user_id } = useParams<Props>();
  const { isMySession } = useIsMySession(user_id!);

  return (
    <If
      condition={isMySession}
      trueRender={
        <NavLink
          to={to}
          end
          className={({ isActive }) => setLinkClassName(isActive)}
        >
          {icon}

          {label}
        </NavLink>
      }
    />
  );
};

const ProfileTab = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-6 pt-[60px]">
      <aside className="h-screen col-span-1 px-4 pt-10 border-r border-solid">
        <NavLink
          to=""
          className={({ isActive }) => setLinkClassName(isActive)}
          end
          aria-current="page"
        >
          <FaRegUserCircle size={16} className="mr-4" />
          프로필
        </NavLink>
        <NavLink
          to="articles"
          end
          className={({ isActive }) => setLinkClassName(isActive)}
        >
          <MdOutlineArticle size={16} className="mr-4" />
          아티클
        </NavLink>
        <Suspense>
          <PrivateNavLink
            to="settings"
            label="설정"
            icon={<IoMdSettings size={16} className="mr-4" />}
          />
        </Suspense>
      </aside>

      <main className="col-span-5 px-10 pt-16">{children}</main>
    </div>
  );
};

export default ProfileTab;
