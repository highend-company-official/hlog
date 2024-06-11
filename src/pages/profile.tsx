import { Outlet } from "react-router-dom";

import { ProfileTab } from "@/entities/profile";
import * as shared from "@/shared";
import { Header } from "@/widgets/header";

const ProfilePage = () => {
  const { scrollToTop } = shared.useScrollToTop();

  shared.useMount(() => {
    scrollToTop();
  });

  return (
    <>
      <Header />

      <ProfileTab>
        <Outlet />
      </ProfileTab>
    </>
  );
};

export default ProfilePage;
