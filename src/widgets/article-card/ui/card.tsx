import dayjs from "dayjs";
import { ArticleType, If, useBucket, useProfile } from "@/shared";
import { BiSolidLike } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PiSealCheckFill } from "react-icons/pi";

type ArticleCardProps = Omit<ArticleType, "body">;

const Card = (props: ArticleCardProps) => {
  const navigate = useNavigate();

  const { read: readThubmnails } = useBucket("thumbnails");
  const profileData = useProfile(props.profile.user_id);

  return (
    <section className="relative flex flex-col w-full h-full transition ease-in">
      <img
        src={readThubmnails(props.thumbnail)}
        alt={props.title}
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

      <div className="inline-block w-full mt-2">
        <span className="text-4xl font-semibold text-black break-words ease-in-out text-wrap break-wordsbreak-keep mb-2transition line-clamp-1">
          {props.title}
        </span>
        <p className="text-wrap break-words mt-2 h-[120px] text-gray-500 line-clamp-5">
          {props.summary}
        </p>
      </div>

      <div className="flex justify-between mt-auto">
        <span className="text-sm font-light text-gray-600">
          {props.updated_at
            ? dayjs(props.updated_at).format("YYYY-MM-DD")
            : dayjs(props.created_at).format("YYYY-MM-DD")}
        </span>

        <div className="flex items-center gap-1 mr-2 text-sm">
          <div className="flex items-center text-sm">
            <BiSolidLike className="mr-1" />
            <span>{props.likes}</span>
          </div>

          <div className="flex items-center text-sm">
            <IoMdEye className="mr-1 " />
            <span>{props.hits}</span>
          </div>
        </div>
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
