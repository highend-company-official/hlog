import { useNavigate } from "react-router-dom";
import useBucket from "@/shared/libs/useBucket";
import { CommentType } from "@/shared/schema";
import { isProviderURL } from "@/shared";
import defaultProfile from "@/shared/assets/default-profile.jpg";

const CommentCard = ({
  body,
  profiles: { id, username, profile_url },
}: CommentType) => {
  const navigate = useNavigate();
  const { read: readProfiles } = useBucket("profiles");

  return (
    <article className="px-6 py-8 mb-5 text-base rounded-lg bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div
          className="flex items-center p-3 transition ease-in-out rounded-lg cursor-pointer hover:bg-black/10"
          onClick={() => navigate(`/profile/${id}`)}
        >
          <img
            src={
              profile_url
                ? isProviderURL(profile_url)
                  ? profile_url
                  : readProfiles(profile_url)
                : defaultProfile
            }
            alt={username}
            className="object-cover w-12 h-12 mr-3 rounded-full"
          />
          <span className="font-bold">{username}</span>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">{body}</p>
    </article>
  );
};

export default CommentCard;
