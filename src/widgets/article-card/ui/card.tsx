import dayjs from "dayjs";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { PiSealCheckFill } from "react-icons/pi";
import { FaCommentAlt } from "react-icons/fa";

import { useGetArticles } from "@/entities/article";
import { ArrayElement, If, useBucket, useProfile } from "@/shared";

type ArticleCardProps = ArrayElement<ReturnType<typeof useGetArticles>["data"]>;

const Card = (props: ArticleCardProps) => {
  const navigate = useNavigate();

  const { read: readThubmnails } = useBucket("thumbnails");
  const profileData = useProfile(props.profile.id);

  return (
    <section className="relative flex flex-col w-full h-full transition ease-in">
      <img
        src={readThubmnails(props.thumbnail ?? "")}
        alt={props.title ?? ""}
        className="rounded-md object-cover w-full h-[273px]"
      />

      <div className="flex items-center my-3">
        <div className="flex items-center">
          <img
            src={profileData?.profile_url}
            alt={props.profile.username}
            className="w-6 h-6 mr-4 rounded-full"
          />
          <span className="mr-3 font-bold text-gray-700">
            {props.profile.username}
          </span>
          <If
            condition={profileData?.verified === "verified"}
            trueRender={<PiSealCheckFill size={20} className="text-primary" />}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <span className="text-sm font-light text-gray-600">
          {dayjs(props.created_at).format("YYYY-MM-DD")}
        </span>

        <div className="flex items-center gap-2 mr-2 text-sm">
          <div className="flex items-center text-sm">
            <BiSolidLike className="mr-1" />
            <span>{props.likeCount}</span>
          </div>

          <div className="flex items-center text-sm">
            <FaCommentAlt className="mr-1 " />
            <span>{props.commentCount}</span>
          </div>
        </div>
      </div>

      <div className="inline-block w-full mt-1">
        <span className="text-4xl font-semibold text-black break-words ease-in-out text-wrap break-wordsbreak-keep mb-2transition line-clamp-1">
          {props.title}
        </span>

        {props.categories.length > 0 && (
          <div className="flex flex-wrap">
            {props.categories.map((category) => (
              <div key={category} className="mt-1 text-sm text-primary">
                # {category}
              </div>
            ))}
          </div>
        )}

        <p className="text-wrap break-words mt-2 mb-4 h-[80px] text-gray-500 line-clamp-5">
          {props.summary}
        </p>
      </div>

      <button
        className="w-full py-4 mt-auto text-white rounded-md bg-primary"
        onClick={() => navigate(`/article-read/${props.id}`)}
      >
        Read More
      </button>
    </section>
  );
};

export default Card;
