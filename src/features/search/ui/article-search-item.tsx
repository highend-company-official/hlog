import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FaBook } from "react-icons/fa";
import useSearchStore from "@/entities/search-input/model";

type Props = {
  id: string;
  title: string;
  username: string;
  created_at: string;
};

const SearchItem = ({ id, title, username, created_at }: Props) => {
  const { setIsSearchOpen, reset } = useSearchStore();

  const handleClose = () => {
    reset();
    setIsSearchOpen(false);
  };

  return (
    <li
      className="mx-6 mb-3 list-none transition ease-in-out rounded-md hover:bg-primary group"
      onClick={handleClose}
    >
      <Link to={`/article-read/${id}`}>
        <div className="flex items-center w-full px-4 py-3">
          <FaBook
            size={24}
            className="mr-3 text-primary group-hover:text-white"
          />
          <h3 className="font-bold group-hover:text-white">{title}</h3>
          <div className="flex ml-auto group-hover:text-white">
            <span>{username}</span>
            <span>{dayjs(created_at).format("YYYY-MM-YY")}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SearchItem;
