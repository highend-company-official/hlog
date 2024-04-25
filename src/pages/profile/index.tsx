import * as shared from "@/shared";
import * as features from "@/features";

const ProfilePage = () => {
  const { data } = shared.useSession();

  return (
    <>
      HelloWorld
      <shared.Button intent="error" onClick={features.auth.signOut}>
        로그아웃
      </shared.Button>
    </>
  );
};

export default ProfilePage;
