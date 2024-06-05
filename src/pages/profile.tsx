import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import * as shared from "@/shared";
import { ProfileTab } from "@/entities/profile";

const ProfilePage = () => {
  return (
    <Suspense fallback={<shared.Skeleton height={500} />}>
      <ProfileTab>
        <Outlet />
      </ProfileTab>
    </Suspense>
  );
};

export default ProfilePage;
