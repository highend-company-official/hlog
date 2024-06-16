import classNames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

import {
  ArrayElement,
  getElapsedTime,
  useBucket,
  useIsMySession,
  useOverlay,
} from "@/shared";

import { DeleteArticleModal } from "@/features/delete-article";
import { useFetchUserArticles } from "@/widgets/profile-articles";
import { memo, useCallback } from "react";

type ArticleCardProps = ArrayElement<
  ReturnType<typeof useFetchUserArticles>["data"]
>;

const ProfileArticleCard = memo((props: ArticleCardProps) => {
  const { user_id } = useParams<{
    user_id: string;
  }>();
  const navigate = useNavigate();
  const { open: openDeleteModal } = useOverlay();
  const { isMySession } = useIsMySession(user_id!);
  const { read } = useBucket("thumbnails");

  const buttonClassName =
    "ml-3 text-2xl rounded-xl hover:bg-black/10 p-4 transition ease-in-out";

  const handleOpenDeleteModal = useCallback(() => {
    openDeleteModal(({ exit, isOpen }) => (
      <DeleteArticleModal isOpen={isOpen} onClose={exit} articleId={props.id} />
    ));
  }, [openDeleteModal, props.id]);

  return (
    <li className="flex w-full h-20 mb-2 list-none border-solid">
      <Link
        to={`/article-read/${props.id}`}
        className="grid items-center w-full h-20 grid-cols-12 gap-4 transition ease-in-out col-span-full hover:bg-black/10 rounded-xl group"
      >
        <img
          src={read(props.thumbnail ?? "")}
          alt={props.title ?? ""}
          className="object-cover w-full h-20 col-span-1 max-w-20 rounded-xl max-xl:hidden"
        />

        <div className="col-span-8">
          <span className="font-bold group-hover:text-primary">
            {props.title} [{props.commentCount}]
          </span>
          <p className="text-gray-400 truncate max-md:hidden">
            {props.summary}
          </p>
        </div>

        <div className="col-span-3 ml-auto mr-3 text-slate-500 max-xl:hidden">
          <span>{props.profile.username}</span>
          <span> | </span>
          <span>{getElapsedTime(props.created_at)}</span>
        </div>
      </Link>

      {isMySession && (
        <div className="flex">
          <button
            onClick={() => navigate(`/article-write/${props.id}`)}
            type="button"
            className={classNames(buttonClassName)}
          >
            <MdEdit />
          </button>

          <button
            type="button"
            className={classNames(buttonClassName, "hover:text-error")}
            onClick={handleOpenDeleteModal}
          >
            <MdDelete />
          </button>
        </div>
      )}
    </li>
  );
});

ProfileArticleCard.displayName = "ProfileArticleCard";

export default ProfileArticleCard;
