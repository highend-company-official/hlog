import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { ErrorMessage, Modal, TextArea } from "@/shared";
import { useToastStore } from "@/app/model";
import { useFetchComments } from "@/entities/comment/lib";

import { useUpdateComment } from "../lib";

type FormValue = {
  comment: string;
};

type Props = {
  body: string;
  commentId: string;
};

const EditCommentButton = ({ body, commentId }: Props) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isValid },
  } = useForm<FormValue>({
    defaultValues: {
      comment: body,
    },
  });
  const params = useParams<{ article_id: string }>();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { mutateAsync: updateComment, isPending } = useUpdateComment(commentId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    resetField("comment");
    setIsModalOpen(false);
  };

  const handleEditComment = (formValue: FormValue) => {
    const { comment } = formValue;

    updateComment(comment)
      .then(() => {
        addToast({
          type: "success",
          content: "댓글 수정이 완료되었습니다.",
          staleTime: 3000,
        });
        queryClient.invalidateQueries({
          queryKey: useFetchComments.pk(params.article_id!),
        });
      })
      .catch((error) => {
        addToast({
          type: "error",
          content: "댓글 수정이 실패했습니다." + error,
          staleTime: 3000,
        });
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  return (
    <>
      <button className="mr-2" onClick={() => setIsModalOpen(true)}>
        수정
      </button>
      {isModalOpen && (
        <Modal>
          <Modal.Header>수정할 내용을 입력해주세요.</Modal.Header>
          <Modal.Content>
            <p className="text-xs text-center text-gray-500 ms-auto">
              상대방을 향한 비난이나 욕설은 차단 등의 조치가 취해질 수 있습니다.
            </p>

            <div className="mt-2 mb-2">
              <TextArea
                {...register("comment", {
                  required: "댓글은 공백이 되면 안됩니다.",
                })}
                id="comment"
                rows={4}
                placeholder="댓글을 입력해주세요..."
                disabled={isPending}
              />
            </div>
            <ErrorMessage errors={errors} name="comment" />
          </Modal.Content>
          <Modal.Footer align="right">
            <Modal.Button
              type="normal"
              onClick={handleCancel}
              disabled={isPending}
            >
              취소
            </Modal.Button>
            <div className="ml-2" />
            <Modal.Button
              type="accept"
              onClick={handleSubmit(handleEditComment)}
              disabled={!isValid}
            >
              수정하기
            </Modal.Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EditCommentButton;
