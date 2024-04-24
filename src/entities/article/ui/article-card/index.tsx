import type { Article } from "@/shared";
import { Link } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";

const ArticleCard = ({
  id,
  created_at,
  hits,
  like,
  verified,
  summary,
  thumbnail,
  title,
  updated_at,
  profiles: { username },
}: Article) => {
  return (
    <section className="px-10 py-6 my-4 rounded-lg shadow-md bg-slate-50">
      <div className="flex items-center">
        {verified && (
          <MdVerifiedUser className="w-[24px] h-[24px] mr-2" color="#2563eb" />
        )}
        <span className="mr-3 font-bold text-gray-700">{username}</span>
        <span className="font-light text-gray-600">
          {updated_at
            ? `글 수정일 : ${updated_at}`
            : `글 작성일 : ${created_at}`}
        </span>
      </div>

      <div className="inline-block w-full mt-2">
        <img
          src={thumbnail}
          alt={title}
          className="w-[240px] max-lg:w-[180px] max-md:w-0 h-64 rounded-3xl object-cover float-right ml-8"
        />

        <span className="text-5xl font-bold text-gray-700 break-words hover:text-gray-600 break-keep">
          {title}
        </span>
        <p className="mt-2 text-gray-600">{summary}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Link
          className="text-blue-600 hover:underline"
          to={`/article-read/${id}`}
        >
          Read more
        </Link>

        <div className="flex">
          <div className="flex mr-2">
            <BiSolidLike className="mr-1" />
            <span>{like?.length}</span>
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
