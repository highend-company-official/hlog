import useBucket from "@/shared/libs/useBucket";
import defaultProfile from "@/shared/assets/default-profile.jpg";
import { useParams } from "react-router-dom";
import { useFetchArticle } from "../../lib";
import { isProviderURL } from "@/shared";
import "@/shared/styles/index.css";

type ParamsType = {
  article_id: string;
};

const ArticleView = () => {
  const { article_id } = useParams<ParamsType>();
  const { data } = useFetchArticle(article_id!);
  const { read: readThumbnails } = useBucket("thumbnails");
  const { read: readProfiles } = useBucket("profiles");

  if (!data) {
    return null;
  }

  return (
    <article>
      <img
        src={readThumbnails(data!.thumbnail)}
        alt={data.summary}
        className="object-cover w-full rounded-xl mt-9 h-96"
      />
      <h3 className="mt-4 text-5xl break-words break-keep">{data?.title}</h3>
      <span className="pt-4 text-subTitle">{data?.summary}</span>

      <section className="flex mt-5">
        <img
          src={
            data?.profiles.profile_url
              ? isProviderURL(data?.profiles.profile_url)
                ? data?.profiles.profile_url
                : readProfiles(data?.profiles.profile_url)
              : defaultProfile
          }
          alt={data?.profiles.username}
          className="object-cover w-12 h-12 mr-3 rounded-full"
        />
        <div className="flex items-center justify-center">
          <span className="font-bold">{data?.profiles.username}</span>
        </div>
      </section>

      <div
        className="text-base leading-6 mt-9"
        id="hlog"
        dangerouslySetInnerHTML={{
          __html: data?.body,
        }}
      />
    </article>
  );
};

export default ArticleView;
