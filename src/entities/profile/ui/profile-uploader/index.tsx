import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const ProfileUploader = ({ children }: Props) => {
  const [profileData, setProfileData] =
    useState<React.ChangeEvent<HTMLInputElement> | null>(null);

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  return (
    <div>
      {children}
      <input type="file" onChange={(data) => setProfileData(data)} />
    </div>
  );
};

export default ProfileUploader;
