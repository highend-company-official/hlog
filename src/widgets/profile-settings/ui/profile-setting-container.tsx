import { UserQuitButton } from "@/features/quit-user";
import { SignOutButton } from "@/features/sign-out";
import { ProfileUploadForm } from "@/features/upload-profile";
import { UserInfoSettingForm } from "@/features/edit-user-info";
import { SEO } from "@/shared";

export type Options = {
  isDarkMode: boolean;
  editorConfig: null;
};

const ProfileSettingsContainer = () => {
  return (
    <>
      <SEO title="HLOG | 프로필 설정" />
      <header className="pb-4 mb-10 border-b border-solid">
        <h2 className="text-4xl font-semibold">프로필 설정</h2>
        <span className="text-sm text-subTitle">
          유저의 프로필을 설정합니다.
        </span>
      </header>

      <div className="grid grid-cols-12">
        <div className="flex flex-col justify-center col-span-4 col-start-5">
          <ProfileUploadForm />
        </div>

        <div className="col-span-6 col-start-4">
          <UserInfoSettingForm />
        </div>

        <div className="col-span-2 col-start-6">
          <SignOutButton />
          <UserQuitButton />
        </div>
      </div>
    </>
  );
};

export default ProfileSettingsContainer;
