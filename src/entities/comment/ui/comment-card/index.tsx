import { useNavigate } from "react-router-dom";
import useBucket from "@/shared/libs/useBucket";
import { CommentType } from "@/shared/schema";
import { isProviderURL } from "@/shared";
import defaultProfile from "@/shared/assets/default-profile.jpg";

const CommentCard = (props: CommentType) => {
  const navigate = useNavigate();
  const { read: readProfiles } = useBucket("profiles");

  return (
    <article className="px-6 py-8 mb-5 text-base rounded-lg bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div
          className="flex items-center p-3 transition ease-in-out rounded-lg cursor-pointer hover:bg-black/10"
          onClick={() => navigate(`/profile/${props.profiles.id}`)}
        >
          <img
            src={
              props.profiles.profile_url
                ? isProviderURL(props.profiles.profile_url)
                  ? props.profiles.profile_url
                  : readProfiles(props.profiles.profile_url)
                : defaultProfile
            }
            alt={props.profiles.username}
            className="object-cover w-12 h-12 mr-3 rounded-full"
          />
          <span className="font-bold">{props.profiles.username}</span>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">{props.body}</p>
    </article>
  );
};

export default CommentCard;
