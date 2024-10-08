import { Link } from "react-router-dom";

import defaultProfile from "@/shared/assets/default-profile.jpg";
import { ArrayElement, useBucket } from "@/shared";
import { useGetSearchedProfiles, useSearchStore } from "@/entities/search";

type Props = ArrayElement<ReturnType<typeof useGetSearchedProfiles>["data"]>;

const ProfileSearchItem = ({ id, username, profile_url }: Props) => {
  const { read } = useBucket("profiles");
  const { setIsSearchOpen, reset } = useSearchStore();

  const handleClose = () => {
    reset();
    setIsSearchOpen(false);
  };

  return (
    <li
      className="mx-3 mb-3 list-none transition ease-in-out rounded-md hover:bg-primary group"
      onClick={handleClose}
    >
      <Link to={`/profile/${id}`}>
        <div className="flex items-center w-full px-4 py-3">
          <img
            src={profile_url ? read(profile_url) : defaultProfile}
            className="object-cover w-8 h-8 rounded-full shadow-sm cursor-pointer mr-4"
          />
          <h3 className="font-bold group-hover:text-white">{username}</h3>
        </div>
      </Link>
    </li>
  );
};

export default ProfileSearchItem;
