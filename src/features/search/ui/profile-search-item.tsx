import { Link } from "react-router-dom";

type Props = {
  id: string;
  username: string;
  profile_url: string;
};

const ProfileSearchItem = ({ id, username, profile_url }: Props) => {
  return (
    <li className="mx-6 mb-3 list-none transition ease-in-out rounded-md hover:bg-primary group">
      <Link to={`/article-read/${id}`}>
        <div className="flex items-center w-full px-4 py-3">
          {profile_url}
          <h3 className="font-bold group-hover:text-white">{username}</h3>
          <div className="flex ml-auto group-hover:text-white">
            <span>{username}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProfileSearchItem;
