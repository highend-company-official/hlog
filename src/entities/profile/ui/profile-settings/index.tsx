import React, { Suspense, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";

import * as shared from "@/shared";
import * as features from "@/features";

const ProfileSettingSection = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState<File | null>(null);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget && event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      setProfileData(file);
    }
  };

  const handleClickInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-medium leading-tight">프로필 사진 등록</h3>
      <div className="flex">
        <div
          className="relative w-64 h-64 my-4 overflow-hidden rounded-full shadow-md bg-black/10"
          onClick={handleClickInput}
        >
          <shared.If
            condition={!!profileData}
            trueRender={
              profileData && (
                <img
                  src={URL.createObjectURL(profileData)}
                  alt=""
                  className="object-cover w-full h-full"
                />
              )
            }
            falseRender={
              <FaPlus
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
                size={120}
              />
            }
          />
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={handleChangeInput}
      />
    </div>
  );
};

const OptionsSection = () => {
  return (
    <div className="flex flex-col">
      <shared.Blockquote>
        <strong className="font-bold">🛠️ 다크 모드는 시험용 기능입니다.</strong>
      </shared.Blockquote>
      <shared.Switch name="dark-mode" label="다크모드 설정" />
    </div>
  );
};

const ContactSection = () => {
  return null;
};

export type Options = {
  isDarkMode: boolean;
  editorConfig: null;
};

const ProfileSettings = () => {
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    features.auth.signOut().then(() => {
      queryClient.refetchQueries({
        queryKey: [shared.useSession.pk],
      });
    });
  };

  return (
    <>
      <Suspense fallback={<shared.Skeleton height={300} />}>
        <ProfileSettingSection />
      </Suspense>

      <Suspense fallback={<shared.Skeleton height={500} />}>
        <OptionsSection />
      </Suspense>

      <ContactSection />

      <shared.Button className="mt-7" intent="error" onClick={handleSignOut}>
        로그아웃
      </shared.Button>
      {/* TODO: User Profile Setting<
      TODO: Default View Selector Setting<
      TODO: Editor Toolbar Configuration<
      TODO: Dark Mode Setting (Optional)
      TODO: Logout< */}
    </>
  );
};

export default ProfileSettings;
