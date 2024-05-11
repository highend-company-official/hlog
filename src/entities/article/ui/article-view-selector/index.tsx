import { FaList } from "react-icons/fa6";
import { AiFillAppstore } from "react-icons/ai";
import { BiSolidCard } from "react-icons/bi";

import useArticle from "@/app/store/article";
import classNames from "classnames";

const ArticleViewSelector = () => {
  const { articleViewMode, changeViewMode } = useArticle();

  return (
    <div className="inline-flex" role="group">
      <button
        type="button"
        onClick={() => changeViewMode("card")}
        className={classNames(
          "pr-4 py-2 text-sm font-medium text-gray-400 hover:text-primary",
          {
            "text-primary": articleViewMode === "card",
          }
        )}
      >
        <BiSolidCard size={30} />
      </button>
      <button
        type="button"
        onClick={() => changeViewMode("gallery")}
        className={classNames(
          "pr-4 py-2 text-sm font-medium text-gray-400 hover:text-primary",
          {
            "text-primary": articleViewMode === "gallery",
          }
        )}
      >
        <AiFillAppstore size={30} />
      </button>
      <button
        type="button"
        onClick={() => changeViewMode("list")}
        className={classNames(
          "pr-4 py-2 text-sm font-medium text-gray-400 hover:text-primary",
          {
            "text-primary": articleViewMode === "list",
          }
        )}
      >
        <FaList size={30} />
      </button>
    </div>
  );
};

export default ArticleViewSelector;
