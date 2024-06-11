import { useParams } from "react-router-dom";

import { CommentType, QueryBoundary, Skeleton } from "@/shared";

import { useGetComments } from "../lib";

type ParamsType = {
  article_id: string;
};

type CommentListProps = {
  renderCard: React.FC<CommentType>;
};

const CommentList = ({ renderCard: CommentCard }: CommentListProps) => {
  const { article_id } = useParams<ParamsType>();
  const { data } = useGetComments(article_id!);

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full mt-10">
        <h3 className="text-xl">작성된 댓글이 없습니다.</h3>
      </div>
    );
  }

  return (
    <QueryBoundary loadingFallback={<Skeleton height={500} />}>
      {data.map((commentData) => (
        <CommentCard key={commentData.id} {...commentData} />
      ))}
    </QueryBoundary>
  );
};

export default CommentList;
