import { getElapsedTime } from "@/shared";
import useBucket from "@/shared/libs/useBucket";
import { CommentType } from "@/shared/schema";

const CommentCard = ({
  body,
  created_at,
  profiles: { username, profile_url },
}: CommentType) => {
  const profileUrl = useBucket("profiles", profile_url);

  return (
    <article className="px-6 py-8 mb-5 text-base rounded-lg bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img src={profileUrl} alt="" />
          <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900">
            {username}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getElapsedTime(created_at)}
          </p>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">{body}</p>

      {/* <div className="flex items-center">
        <BiSolidLike />
        <span className="ml-3">{likes ? likes?.length : 0}</span>
      </div> */}
    </article>
  );
};

export default CommentCard;
