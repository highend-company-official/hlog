import { ArticleType, useBucket } from "@/shared";
import { Link } from "react-router-dom";

type ArticleCardProps = Omit<ArticleType, "body" | "verified">;

const Gallery = (props: ArticleCardProps) => {
  const { read } = useBucket("thumbnails");
  return (
    <div className="relative transition ease-in h-full place-items-center group rounded-md overflow-hidden">
      <Link to={`/article-read/${props.id}`}>
        <img
          src={read(props.thumbnail)}
          alt={props.title}
          className="object-cover w-full h-full"
        />

        <div className="absolute top-0 left-0 w-full h-full p-4 text-white transition ease-in bg-inherit group-hover:bg-black/70 group-hover:inline-block">
          <span className="hidden overflow-y-hidden font-bold group-hover:inline-block">
            {props.title}
          </span>
          <p className="hidden mt-3 truncate group-hover:flex">
            {props.summary}
          </p>

          <span className="hidden absolute bottom-[1rem] right-[1rem] group-hover:inline-block">
            {props.profile.username}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Gallery;
