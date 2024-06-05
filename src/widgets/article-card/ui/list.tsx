import { ArticleType, getElapsedTime, useBucket } from "@/shared";
import { Link } from "react-router-dom";

type ArticleCardProps = Omit<ArticleType, "body" | "verified">;

const List = (props: ArticleCardProps) => {
  const { read } = useBucket("thumbnails");

  return (
    <Link to={`/article-read/${props.id}`}>
      <li className="flex flex-[1_3] w-full h-[85px] mb-2 list-none transition ease-in border-solid group hover:bg-black/10 rounded-xl">
        <div className="w-[130px] h-[85px]">
          <img
            src={read(props.thumbnail)}
            alt={props.title}
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div className="pl-5 w-[50%] flex flex-col justify-center">
          <span className="font-bold group-hover:text-primary">
            {props.title} [{props.likes}]
          </span>
          <p className=" text-gray-400 truncate max-sm:hidden">
            {props.summary}
          </p>
        </div>
        <div className="flex ml-auto mr-3 text-slate-500 items-center justify-center">
          <span>{props.profile.username}</span>
          <span className="mx-2">|</span>
          <span>{getElapsedTime(props.created_at)}</span>
        </div>
      </li>
    </Link>
  );
};

export default List;
