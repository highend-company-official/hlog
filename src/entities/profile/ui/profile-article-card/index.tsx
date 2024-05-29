import useArticleStore from "@/entities/article/model";
import { ArticleType, Checkbox, getElapsedTime, useBucket } from "@/shared";
import { Link } from "react-router-dom";

type DeleteArticleCardProps = Omit<ArticleType, "body" | "verified"> & {
  isEditMode: boolean;
};

const UserAriticleCard = (props: DeleteArticleCardProps) => {
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
    <li className="flex items-center w-full h-20 mb-2 list-none transition ease-in border-solid group">
      {props.isEditMode && (
        <div className="mr-4">
          <Checkbox
            onChange={handleChangeCheckbox}
            checked={hasArticleInDeleteList}
          />
        </div>
      )}

      <Link
        to={`/article-read/${props.id}`}
        className="flex items-center hover:bg-black/10 w-full h-20 rounded-xl"
      >
        <img
          src={read(props.thumbnail)}
          alt={props.title}
          className="block object-cover w-20 h-20 min-h-10 rounded-xl max-sm:hidden"
        />
        <div className="w-2/3 pl-5">
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
    </li>
  );
};

export default UserAriticleCard;
