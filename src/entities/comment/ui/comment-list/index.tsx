import { useParams } from "react-router-dom";

import CommentCard from "../comment-card";

import { useFetchComments } from "../../lib";
import CommentInput from "../comment-input";

type ParamsType = {
  article_id: string;
};

const CommentList = () => {
  const { article_id } = useParams<ParamsType>();

  const { data } = useFetchComments(parseInt(article_id!));

  if (!data) {
    return null;
  }

  return (
    <>
      <section>
        <CommentInput />
      </section>

      <div className="py-6" />

      {data.map((data) => (
        <CommentCard key={data.id} {...data} />
      ))}

      <div className="py-10" />
    </>
  );
};

export default CommentList;
