import { ProfileTab } from "@/entities/profile";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <>
      <ProfileTab>
        <Outlet />
      </ProfileTab>
    </>
  );
};

export default ProfilePage;
