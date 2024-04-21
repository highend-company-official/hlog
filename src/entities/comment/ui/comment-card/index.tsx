import { BiSolidLike } from "react-icons/bi";
import { type Comment, Button } from "@/shared";

const CommentCard = ({ text, updatedAt, likes, createdAt, users }: Comment) => {
  return (
    <article className="px-6 py-8 mb-5 text-base rounded-lg bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900">
            {users.username}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {updatedAt ? updatedAt : createdAt}
          </p>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">{text}</p>

      {/* <div className="flex items-center">
        <BiSolidLike />
        <span className="ml-3">{likes ? likes?.length : 0}</span>
      </div> */}
    </article>
  );
};

export default CommentCard;
