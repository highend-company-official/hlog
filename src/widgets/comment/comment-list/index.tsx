import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { Skeleton } from "@/shared";

import { useFetchComments } from "@/entities/comment/lib";

import CommentCard from "../comment-card";

type ParamsType = {
  article_id: string;
};

const CommentList = () => {
  const { article_id } = useParams<ParamsType>();

  const { data } = useFetchComments(article_id!);

  if (!data) {
    return null;
  }

  return (
    <Suspense fallback={<Skeleton height={500} />}>
      {data.map((data) => (
        <CommentCard key={data.id} {...data} />
      ))}
    </Suspense>
  );
};

export default CommentList;
