import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useToastStore } from "@/app/store";
import * as shared from "@/shared";
import { FaUserSlash } from "react-icons/fa";
import quitUser from "../lib";

const QuitButton = () => {
  const navigate = useNavigate();
  const params = useParams<{ user_id: string }>();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await quitUser();

      queryClient.refetchQueries({
        queryKey: [
          shared.QUERY_CONSTS.SESSION,
          shared.QUERY_CONSTS.USER,
          params.user_id,
        ],
      });
      addToast({
        type: "success",
        content: "회원탈퇴가 정상적으로 진행되었습니다.",
      });
      navigate("/");
    } catch (error) {
      addToast({
        type: "error",
        content: "회원 탈퇴 과정중 오류가 발생했습니다.",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
        onClick={() => setIsModalOpen(true)}
      >
        회원탈퇴
        <FaUserSlash className="ml-3" size={20} />
      </button>

      <shared.If
        condition={isModalOpen}
        trueRender={
          <shared.Modal>
            <shared.Modal.Header>
              정말로 회원탈퇴 하시겠습니까?
            </shared.Modal.Header>
            <shared.Modal.Content>
              이 작업은 되돌릴 수 없습니다.
            </shared.Modal.Content>
            <shared.Modal.Footer align="right">
              <shared.Modal.Button onClick={() => setIsModalOpen(false)}>
                닫기
              </shared.Modal.Button>
              <div className="ml-2" />
              <shared.Modal.Button onClick={handleDeleteUser} type="decline">
                탈퇴
              </shared.Modal.Button>
            </shared.Modal.Footer>
          </shared.Modal>
        }
      />
    </>
  );
};

export default QuitButton;
