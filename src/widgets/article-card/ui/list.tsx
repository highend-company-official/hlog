import { PiSealCheckFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useGetArticles } from "@/entities/article";
import {
  ArrayElement,
  If,
  getElapsedTime,
  useBucket,
  useProfile,
} from "@/shared";

type ArticleCardProps = ArrayElement<
  ReturnType<typeof useGetArticles>["data"]["pages"][0]
>;

const List = (props: ArticleCardProps) => {
  const { read } = useBucket("thumbnails");
  const profileData = useProfile(props.profile.id);

  return (
    <Link to={`/article-read/${props.id}`}>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          easings: "easeInOut",
          duration: 1,
        }}
        className="flex flex-[1_3] w-full h-[85px] mb-2 list-none transition ease-in border-solid group hover:bg-black/10 rounded-xl"
      >
        <div className="w-[130px] h-[85px]">
          <img
            src={read(props.thumbnail ?? "")}
            alt={props.title ?? ""}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div className="pl-5 w-[50%] flex flex-col justify-center">
          <span className="font-bold group-hover:text-primary">
            {props.title} [{props.commentCount}]
          </span>

          <p className="text-gray-400 truncate max-sm:hidden">
            {props.summary}
          </p>
        </div>
        <div className="flex items-center justify-center ml-auto mr-3 text-slate-500">
          <span>{props.profile.username}</span>
          <If
            condition={profileData?.verified === "verified"}
            trueRender={
              <PiSealCheckFill size={20} className="ml-1 text-primary" />
            }
          />
          <span className="mx-2">|</span>
          <span>{getElapsedTime(props.created_at)}</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default List;
