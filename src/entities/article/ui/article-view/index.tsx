import { useParams } from "react-router-dom";
import { useFetchArticle } from "../../lib";

type ParamsType = {
  article_id: string;
};

const ArticleView = () => {
  const { article_id } = useParams<ParamsType>();

  const { data } = useFetchArticle(parseInt(article_id!));

  if (!data) {
    return null;
  }

  return (
    <article>
      <img
        src={data.thumbnail}
        alt={data.summary}
        className="rounded-xl mt-9 w-full h-96 object-cover"
      />
      <h3 className="mt-4 text-5xl break-keep break-words">{data?.title}</h3>
      <span className="text-subTitle pt-4">{data?.summary}</span>

      <section className="flex mt-5">
        <img
          src={data?.users.profileUrl}
          alt={data?.users.username}
          className="w-12 h-12 mr-3 rounded-full"
        />
        <div className="flex items-center justify-center">
          <span className="font-bold">{data?.users.username}</span>
          <span className="ml-2 font-thin">{data?.createdAt}</span>
        </div>
      </section>

      <div className="mt-9 text-base leading-6">{data?.body}</div>
    </article>
  );
};

export default ArticleView;
