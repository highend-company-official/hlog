import { ArticleType, useBucket, useProfile } from "@/shared";
import dayjs from "dayjs";
import { BiSolidLike } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type ArticleCardProps = Omit<ArticleType, "body" | "verified">;

const Card = (props: ArticleCardProps) => {
  const navigate = useNavigate();

  const { read: readThubmnails } = useBucket("thumbnails");
  const profileData = useProfile(props.profile.user_id);

  return (
    <section className="transition ease-in flex flex-col w-full h-full relative">
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
        </div>
      </div>

      <div className="inline-block w-full mt-2">
        <span className="text-wrap break-words text-4xl font-semibold text-black break-wordsbreak-keep mb-2transition ease-in-out line-clamp-1">
          {props.title}
        </span>
        <p className="text-wrap break-words mt-2 h-[120px] text-gray-500 line-clamp-5">
          {props.summary}
        </p>
      </div>

      <div className="flex justify-between mt-auto">
        <span className="font-light text-gray-600 text-sm">
          {props.updated_at
            ? dayjs(props.updated_at).format("YYYY-MM-DD")
            : dayjs(props.created_at).format("YYYY-MM-DD")}
        </span>

        <div className="flex mr-2 items-center text-sm gap-1">
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
        className="bg-primary text-white rounded-md w-full py-4 mt-auto"
        onClick={() => navigate(`/article-read/${props.id}`)}
      >
        Read More
      </button>
    </section>
  );
};

export default Card;
