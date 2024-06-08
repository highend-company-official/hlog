import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import * as shared from "@/shared";
import { authKeyFactor, quitUser } from "@/entities/auth";

const QuitButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { open } = shared.useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await quitUser();

      queryClient.refetchQueries({
        queryKey: authKeyFactor.session.queryKey,
      });
      open({
        type: "success",
        content: "회원탈퇴가 정상적으로 진행되었습니다.",
      });
      navigate("/");
    } catch (error) {
      open({
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
        className="flex items-center justify-center w-full mt-4 mb-10 underline w-fill"
        onClick={() => setIsModalOpen(true)}
      >
        회원탈퇴
      </button>

      <shared.Modal open={isModalOpen}>
        <shared.Modal.Header>정말로 회원탈퇴 하시겠습니까?</shared.Modal.Header>
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
    </>
  );
};

export default QuitButton;
