import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { ProfileTab } from "@/entities/profile/ui";
import * as shared from "@/shared";

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
