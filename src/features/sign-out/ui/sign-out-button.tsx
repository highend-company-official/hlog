import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

import { AuthQueryKey, signOut } from "@/entities/auth";

const SignOutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await signOut();

    navigate("/", { replace: true });
    queryClient.refetchQueries({
      queryKey: AuthQueryKey.session,
    });
  };

  return (
    <button
      type="button"
      className="justify-between text-white w-full bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center"
      onClick={handleSignOut}
    >
      로그아웃
      <CiLogout className="ml-3" size={20} />
    </button>
  );
};

export default SignOutButton;
