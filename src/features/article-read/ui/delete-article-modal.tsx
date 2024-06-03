import { Modal } from "@/shared";

import { useToastStore } from "@/app/model";

import useArticleStore from "@/entities/article-read/model";

import useDeleteArticle from "../lib/use-delete-article";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteArticleModal = ({ isOpen, onClose, onDelete }: Props) => {
  const { deleteArticleList, resetDeleteArticleList } = useArticleStore();
  const { mutateAsync: deleteArticle, isPending } = useDeleteArticle();
  const { addToast } = useToastStore();

  const handleDeleteArticle = async () => {
    try {
      deleteArticle(deleteArticleList);
      resetDeleteArticleList();
      addToast({
        type: "success",
        content: "성공적으로 삭제를 완료했습니다.",
        staleTime: 3000,
      });
      onDelete();
    } catch (error) {
      addToast({
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
