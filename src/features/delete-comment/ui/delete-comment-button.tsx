import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useToastStore } from "@/app/model";

import { Modal, useOverlay } from "@/shared";

import { CommentQueryKeys } from "@/entities/comment";

import { useDeleteComment } from "../lib";

type Props = {
  commentId: string;
};

const DeleteCommentButton = ({ commentId }: Props) => {
  const { open, exit } = useOverlay();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const params = useParams<{ article_id: string }>();
  const { mutateAsync: deleteComment, isPending } = useDeleteComment();

  const handleOpenDeleteModal = () => {
    open(({ isOpen, exit }) => (
      <Modal open={isOpen}>
        <Modal.Header>댓글을 지우시겠습니까?</Modal.Header>
        <Modal.Content>삭제한 댓글은 다시 복구할 수 없습니다.</Modal.Content>
        <Modal.Footer align="right">
          <Modal.Button type="normal" onClick={exit} disabled={isPending}>
            취소
          </Modal.Button>
          <div className="ml-2" />
          <Modal.Button
            type="decline"
            onClick={handleDeleteComment}
            disabled={isPending}
          >
            삭제하기
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    ));
  };

  const handleDeleteComment = () => {
    deleteComment(commentId)
      .then(() => {
        exit();
        queryClient.invalidateQueries({
          queryKey: CommentQueryKeys.list(params.article_id!),
        });
        addToast({
          type: "success",
          content: "댓글이 성공적으로 삭제되었습니다.",
          staleTime: 3000,
        });
      })
      .catch(() => {
        addToast({
          type: "error",
          content: "댓글 삭제 중 문제가 발생했습니다.",
          staleTime: 3000,
        });
      });
  };

  return (
    <button className="text-error/80" onClick={handleOpenDeleteModal}>
      삭제
    </button>
  );
};

export default DeleteCommentButton;
