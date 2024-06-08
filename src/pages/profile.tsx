import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { ProfileTab } from "@/entities/profile";
import * as shared from "@/shared";
import { Header } from "@/widgets/header";

const ProfilePage = () => {
  return (
    <>
      <Header />

      <ProfileTab>
        <Suspense fallback={<shared.Skeleton height={500} />}>
          <Outlet />
        </Suspense>
      </ProfileTab>
    </>
  );
};

export default ProfilePage;
