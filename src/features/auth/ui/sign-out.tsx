import { useQueryClient } from "@tanstack/react-query";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import { useSession } from "@/shared";

import signOut from "../lib/sign-out";

const SignOutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await signOut();

    navigate("/", { replace: true });
    queryClient.refetchQueries({
      queryKey: useSession.pk,
    });
  };

  return (
    <button
      type="button"
      className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
      onClick={handleSignOut}
    >
      로그아웃
      <CiLogout className="ml-3" size={20} />
    </button>
  );
};

export default SignOutButton;
