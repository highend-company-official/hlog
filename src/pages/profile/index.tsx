import { useSession } from "@/shared";

const ProfilePage = () => {
  const { data } = useSession();

  console.log(data);

  return <>프로필 페이지</>;
};

export default ProfilePage;
