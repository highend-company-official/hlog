import React from "react";
import { Link } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";

import { ViewMode } from "@/app/store/article";

import { getElapsedTime, isProviderURL } from "@/shared";
import { type ArticleType } from "@/shared/schema";
import useBucket from "@/shared/libs/useBucket";
import defaultProfile from "@/shared/assets/default-profile.jpg";

const Card = (props: ArticleType) => {
  const { read: readThubmnails } = useBucket("thumbnails");
  const { read: readProfiles } = useBucket("profiles");

  return (
    <section className="px-10 py-6 my-4 transition ease-in rounded-lg shadow-md bg-slate-50">
      <div className="flex items-center">
        {props.verified && (
          <MdVerifiedUser className="w-[24px] h-[24px] mr-2" color="#2563eb" />
        )}
        <div className="flex items-center">
          <img
            src={
              props.profiles.profile_url
                ? isProviderURL(props.profiles.profile_url)
                  ? props.profiles.profile_url
                  : readProfiles(props.profiles.profile_url)
                : defaultProfile
            }
            alt={props.profiles.username}
            className="w-6 h-6 rounded-full"
          />
          <span className="mr-3 font-bold text-gray-700">
            {props.profiles.username}
          </span>
        </div>
        <span className="font-light text-gray-600">
          {props.updated_at
            ? `글 수정일 : ${props.updated_at}`
            : `글 작성일 : ${props.created_at}`}
        </span>
      </div>

      <div className="inline-block w-full mt-2">
        <img
          src={readThubmnails(props.thumbnail)}
          alt={props.title}
          className="w-[240px] max-lg:w-[180px] max-md:w-0 h-64 rounded-3xl object-cover float-right ml-8"
        />

        <span className="text-5xl font-bold text-gray-700 break-words hover:text-gray-600 break-keep">
          {props.title}
        </span>
        <p className="mt-2 text-gray-600">{props.summary}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Link
          className="text-blue-600 hover:underline"
          to={`/article-read/${props.id}`}
        >
          Read more
        </Link>

        <div className="flex">
          <div className="flex mr-2">
            <BiSolidLike className="mr-1" />
            {/* <span>{like?.length}</span> */}
          </div>

          <div className="flex">
            <IoMdEye className="mr-1" />
            <span>{props.hits}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const List = (props: ArticleType) => {
  const { read } = useBucket("thumbnails");
  return (
    <Link to={`/article-read/${props.id}`}>
      <li className="flex items-center h-20 mb-2 list-none transition ease-in border-solid group hover:bg-black/10 rounded-xl">
        <img
          src={read(props.thumbnail)}
          alt={props.title}
          className="block object-cover w-20 h-20 min-h-10 rounded-xl max-sm:hidden"
        />
        <div className="pl-5 border-b border-gray-300">
          <span className="font-bold group-hover:underline">
            {props.title} [{props.hits ?? 0}]
          </span>
          <p className="text-gray-400 max-sm:hidden">{props.summary}</p>
        </div>
        <div className="ml-auto mr-3">
          <span>{getElapsedTime(props.created_at)}</span>
        </div>
      </li>
    </Link>
  );
};

const Gallery = (props: ArticleType) => {
  const { read } = useBucket("thumbnails");
  return (
    <div className="relative transition ease-in h-80 place-items-center group">
      <Link to={`/article-read/${props.id}`}>
        <img
          src={read(props.thumbnail)}
          alt={props.title}
          className="object-cover w-full h-full"
        />

        <div className="absolute top-0 left-0 hidden w-full h-full p-4 text-white transition ease-in group-hover:bg-black/70 group-hover:inline-block ">
          <span className="overflow-y-hidden font-bold">{props.title}</span>
          <p className="mt-3 truncate">{props.summary}</p>

          <span className="absolute bottom-[1rem] right-[1rem]">
            {props.profiles.username}
          </span>
        </div>
      </Link>
    </div>
  );
};

const ArticleCard = (props: ArticleType & { viewMode: ViewMode }) => {
  type ViewMap = {
    [mode in ViewMode]: React.ReactNode;
  };

  const VIEW_MAP: ViewMap = {
    card: <Card {...props} />,
    list: <List {...props} />,
    gallery: <Gallery {...props} />,
  };

  return (VIEW_MAP[props.viewMode] ?? <Card {...props} />) as JSX.Element;
};

export default ArticleCard;
