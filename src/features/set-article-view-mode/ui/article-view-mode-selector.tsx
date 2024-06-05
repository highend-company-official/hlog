import classNames from "classnames";
import { AiFillAppstore } from "react-icons/ai";
import { BiSolidCard } from "react-icons/bi";
import { FaList } from "react-icons/fa6";

import { useArticleStore } from "@/entities/article";

const ArticleViewModeSelector = () => {
  const { articleViewMode, changeViewMode } = useArticleStore();

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

export default ArticleViewModeSelector;
