import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

import { QUERY_CONSTS } from "@/shared";
import signOut from "../lib";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ user_id: string }>();

  const handleSignOut = async () => {
    await signOut();

    queryClient.refetchQueries({
      queryKey: [QUERY_CONSTS.USER, params.user_id],
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
