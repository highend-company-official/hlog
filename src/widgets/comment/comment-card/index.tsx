import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { CommentType } from "@/shared/schema";
import * as shared from "@/shared";
import defaultProfile from "@/shared/assets/default-profile.jpg";

import { useFetchArticle } from "@/entities/article/lib";
import { DeleteCommentButton } from "@/features/comment/delete-comment";

type Params = {
  article_id: string;
};

const CommentCard = (props: CommentType) => {
  const navigate = useNavigate();
  const params = useParams<Params>();
  const { read: readProfiles } = shared.useBucket("profiles");
  const queryClient = useQueryClient();

  const articleData = queryClient.getQueryData<shared.ArticleType>(
    useFetchArticle.pk(params.article_id!)
  );

  if (!articleData) return null;

  return (
    <article className="px-6 py-6 mb-5 text-base rounded-lg bg-gray-50">
      <div className="flex items-center justify-start mb-2">
        <div
          className="flex items-center p-2 transition ease-in-out rounded-lg cursor-pointer hover:bg-black/10"
          onClick={() => navigate(`/profile/${props.profiles.id}`)}
        >
          <img
            src={
              props.profiles.profile_url
                ? shared.isProviderURL(props.profiles.profile_url)
                  ? props.profiles.profile_url
                  : readProfiles(props.profiles.profile_url)
                : defaultProfile
            }
            alt={props.profiles.username}
            className="object-cover w-10 h-10 mr-3 rounded-full"
          />
          <span className="font-bold">{props.profiles.username}</span>
        </div>

        <shared.If
          condition={props.profiles.id === articleData.profile.user_id}
          trueRender={
            <>
              <span className="px-3 py-1 ml-3 text-sm text-white rounded-full bg-primary">
                작성자
              </span>

              <div className="ml-auto">
                <DeleteCommentButton commentId={props.id} />
              </div>
            </>
          }
        />
      </div>
      <p className="text-gray-500 dark:text-gray-400">{props.body}</p>
    </article>
  );
};

export default CommentCard;
