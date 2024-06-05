import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

import { ArticleType, getElapsedTime, useBucket } from "@/shared";
import { useArticleStore } from "@/entities/article";

type DeleteArticleCardProps = Omit<ArticleType, "body" | "verified"> & {
  isEditMode: boolean;
};

const ProfileArticleCard = (props: DeleteArticleCardProps) => {
  const { read } = useBucket("thumbnails");
  const {
    deleteArticleList,
    addToDeleteArticleList,
    removeFromDeleteArticleList,
  } = useArticleStore();

  const hasArticleInDeleteList = deleteArticleList.includes(props.id);

  const handleChangeCheckbox = () => {
    if (hasArticleInDeleteList) {
      removeFromDeleteArticleList(props.id);
    } else {
      addToDeleteArticleList(props.id);
    }
  };

  return (
    <li className="relative flex items-center w-full h-20 mb-2 list-none transition ease-in border-solid group">
      <Link
        to={`/article-read/${props.id}`}
        className="flex items-center hover:bg-black/10 w-full h-20 rounded-xl"
      >
        <img
          src={read(props.thumbnail)}
          alt={props.title}
          className="block object-cover w-20 h-20 min-h-10 rounded-xl max-sm:hidden"
        />
        <div className="w-3/5 pl-5">
          <span className="font-bold group-hover:text-primary">
            {props.title} [{props.likes}]
          </span>
          <p className="text-gray-400 truncate max-sm:hidden">
            {props.summary}
          </p>
        </div>
        <div className="ml-auto mr-3 text-slate-500">
          <span>{props.profile.username}</span>
          <span> | </span>
          <span>{getElapsedTime(props.created_at)}</span>
        </div>
      </Link>
      {props.isEditMode && (
        <div className="mr-4 flex">
          <button>
            <MdEdit />
          </button>
          <button>
            <MdDelete />
          </button>
        </div>
      )}
    </li>
  );
};

export default ProfileArticleCard;
