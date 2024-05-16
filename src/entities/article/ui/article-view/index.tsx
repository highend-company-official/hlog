import useBucket from "@/shared/libs/useBucket";
import defaultProfile from "@/shared/assets/default-profile.jpg";
import { useParams } from "react-router-dom";
import { useFetchArticle } from "../../lib";

type ParamsType = {
  article_id: string;
};

const ArticleView = () => {
  const { article_id } = useParams<ParamsType>();
  const { data } = useFetchArticle(article_id!);
  const { read } = useBucket("thumbnails", data!.thumbnail);

  if (!data) {
    return null;
  }

  return (
    <article>
      <img
        src={read()}
        alt={data.summary}
        className="object-cover w-full rounded-xl mt-9 h-96"
      />
      <h3 className="mt-4 text-5xl break-words break-keep">{data?.title}</h3>
      <span className="pt-4 text-subTitle">{data?.summary}</span>

      <section className="flex mt-5">
        <img
          src={data?.profiles.profile_url ?? defaultProfile}
          alt={data?.profiles.username}
          className="w-12 h-12 mr-3 rounded-full"
        />
        <div className="flex items-center justify-center">
          <span className="font-bold">{data?.profiles.username}</span>
          {/* <span className="ml-2 font-thin">{data?.createdAt}</span> */}
        </div>
      </section>

      <div
        className="text-base leading-6 mt-9"
        dangerouslySetInnerHTML={{
          __html: data?.body,
        }}
      />
    </article>
  );
};

export default ArticleView;
