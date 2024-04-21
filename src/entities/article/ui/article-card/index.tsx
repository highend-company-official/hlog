import type { Article } from "@/shared";
import { Link } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";

const ArticleCard = ({
  id,
  createdAt,
  hits,
  like,
  verified,
  summary,
  thumbnail,
  title,
  updatedAt,
  username,
}: Article) => {
  return (
    <section className="px-10 my-4 py-6 bg-slate-50 rounded-lg shadow-md">
      <div className="flex items-center">
        {verified && (
          <MdVerifiedUser className="w-[24px] h-[24px] mr-2" color="#2563eb" />
        )}
        <span className="font-bold text-gray-700 mr-3">{username}</span>
        <span className="font-light text-gray-600">
          {updatedAt ? `글 수정일 : ${updatedAt}` : `글 작성일 : ${createdAt}`}
        </span>
      </div>

      <div className="mt-2 inline-block w-full">
        <img
          src={thumbnail}
          alt={title}
          className="w-[240px] max-lg:w-[180px] max-md:w-0 h-64 rounded-3xl object-cover float-right ml-8"
        />

        <span className="text-5xl text-gray-700 font-bold hover:text-gray-600 break-words break-keep">
          {title}
        </span>
        <p className="mt-2 text-gray-600">{summary}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link
          className="text-blue-600 hover:underline"
          to={`/article-read/${id}`}
        >
          Read more
        </Link>

        <div className="flex">
          <div className="flex mr-2">
            <BiSolidLike className="mr-1" />
            <span>{like.length}</span>
          </div>

          <div className="flex">
            <IoMdEye className="mr-1" />
            <span>{hits}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleCard;
