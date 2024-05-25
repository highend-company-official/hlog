import useBucket from "@/shared/libs/useBucket";
import defaultProfile from "@/shared/assets/default-profile.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchArticle } from "../../lib";
import { isProviderURL } from "@/shared";
import "@/shared/styles/index.css";

type ParamsType = {
  article_id: string;
};

const ArticleView = () => {
  const navigate = useNavigate();
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
      <section className="flex mt-5 items-center justify-between h-[50px]">
        <h3 className="text-5xl font-bold text-gray-700 break-words break-keep">
          {data?.title}
        </h3>
        <div
          className="flex items-center p-3 transition ease-in-out rounded-lg cursor-pointer hover:bg-black/10"
          onClick={() => navigate(`/profile/${data.profile.user_id}`)}
        >
          <img
            src={
              data?.profile.profile_url
                ? isProviderURL(data?.profile.profile_url)
                  ? data?.profile.profile_url
                  : readProfiles(data?.profile.profile_url)
                : defaultProfile
            }
            alt={data?.profile.username}
            className="object-cover w-12 h-12 mr-3 rounded-full"
          />
          <span className="font-bold">{data?.profile.username}</span>
        </div>
      </section>
      <div className="p-4 mt-4 bg-gray-200">
        이 글의 요약 :
        <span className="font-bold text-subTitle">{data?.summary}</span>
      </div>

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
