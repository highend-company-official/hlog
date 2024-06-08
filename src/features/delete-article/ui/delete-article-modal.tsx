import { useQueryClient } from "@tanstack/react-query";

import { articleKeyFactor } from "@/entities/article";
import { Modal, useToast } from "@/shared";

import { useDeleteArticle } from "../lib";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  articleId: string;
};

const DeleteArticleModal = ({ isOpen, onClose, articleId }: Props) => {
  const { open } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteArticle, isPending } = useDeleteArticle();

  const handleDeleteArticle = async () => {
    try {
      await deleteArticle(articleId);

      open({
        type: "success",
        content: "성공적으로 삭제를 완료했습니다.",
        staleTime: 3000,
      });

      queryClient.invalidateQueries({
        queryKey: articleKeyFactor.list._def,
      });
    } catch (error) {
      open({
        type: "error",
        content: "삭제중 에러가 발생하였습니다.",
      });
    } finally {
      onClose();
    }
  };

  return (
    <Modal open={isOpen}>
      <Modal.Header>정말로 삭제하시겠습니까?</Modal.Header>
      <Modal.Content>한번 삭제한 아티클을 되돌릴 수 없습니다.</Modal.Content>
      <Modal.Footer align="right">
        <Modal.Button disabled={isPending} type="normal" onClick={onClose}>
          취소
        </Modal.Button>
        <div className="ml-3"></div>
        <Modal.Button
          disabled={isPending}
          type="decline"
          onClick={handleDeleteArticle}
        >
          삭제
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteArticleModal;
