import dayjs from "dayjs";
import React from "react";
import { BiSolidLike } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";

import { useArticleStore, type ViewMode } from "@/entities/article";

import {
  getElapsedTime,
  isProviderURL,
  useBucket,
  ArticleType,
} from "@/shared";
import defaultProfile from "@/shared/assets/default-profile.jpg";

type ArticleCardProps = Omit<ArticleType, "body" | "verified">;

const Card = (props: ArticleCardProps) => {
  const { read: readThubmnails } = useBucket("thumbnails");
  const { read: readProfiles } = useBucket("profiles");

  return (
    <section className="px-10 py-6 my-4 transition ease-in rounded-lg shadow-md bg-slate-50 group">
      <Link to={`/article-read/${props.id}`}>
        <div className="flex items-center">
          <div className="flex items-center">
            <img
              src={
                props.profile.profile_url
                  ? isProviderURL(props.profile.profile_url)
                    ? props.profile.profile_url
                    : readProfiles(props.profile.profile_url)
                  : defaultProfile
              }
              alt={props.profile.username}
              className="w-6 h-6 mr-4 rounded-full"
            />
            <span className="mr-3 font-bold text-gray-700">
              {props.profile.username}
            </span>
          </div>

          <span className="font-light text-gray-600">
            {props.updated_at
              ? dayjs(props.updated_at).format("YYYY-MM-DD")
              : dayjs(props.created_at).format("YYYY-MM-DD")}
          </span>
        </div>

        <div className="inline-block w-full mt-2">
          <img
            src={readThubmnails(props.thumbnail)}
            alt={props.title}
            className="w-[240px] max-lg:w-[180px] max-md:w-0 h-64 rounded-3xl object-cover float-right ml-8"
          />

          <span className="text-4xl font-semibold text-[#333d4b] break-wordsbreak-keep mb-2 group-hover:text-primary transition ease-in-out">
            {props.title}
          </span>
          <p className="text-wrap break-words mt-2 text-gray-600">
            {props.summary}
          </p>
        </div>

        <div className="flex">
          <div className="flex mr-2 items-center">
            <BiSolidLike className="mr-1" />
            <span>{props.likes}</span>
          </div>

          <div className="flex items-center">
            <IoMdEye className="mr-1 " />
            <span>{props.hits}</span>
          </div>
        </div>
      </Link>
    </section>
  );
};

const List = (props: ArticleCardProps) => {
  const { read } = useBucket("thumbnails");
  return (
    <Link to={`/article-read/${props.id}`}>
      <li className="flex flex-[1_3] w-full h-[85px] mb-2 list-none transition ease-in border-solid group hover:bg-black/10 rounded-xl">
        <div className="w-[130px] h-[85px]">
          <img
            src={read(props.thumbnail)}
            alt={props.title}
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div className="pl-5 w-[50%] flex flex-col justify-center">
          <span className="font-bold group-hover:text-primary">
            {props.title} [{props.likes}]
          </span>
          <p className=" text-gray-400 truncate max-sm:hidden">
            {props.summary}
          </p>
        </div>
        <div className="flex ml-auto mr-3 text-slate-500 items-center justify-center">
          <span>{props.profile.username}</span>
          <span className="mx-2">|</span>
          <span>{getElapsedTime(props.created_at)}</span>
        </div>
      </li>
    </Link>
  );
};

const Gallery = (props: ArticleCardProps) => {
  const { read } = useBucket("thumbnails");
  return (
    <div className="relative transition ease-in h-80 place-items-center group rounded-xl overflow-hidden">
      <Link to={`/article-read/${props.id}`}>
        <img
          src={read(props.thumbnail)}
          alt={props.title}
          className="object-cover w-full h-full"
        />

        <div className="absolute top-0 left-0 w-full h-full p-4 text-white transition ease-in bg-inherit group-hover:bg-black/70 group-hover:inline-block">
          <span className="hidden overflow-y-hidden font-bold group-hover:inline-block">
            {props.title}
          </span>
          <p className="hidden mt-3 truncate group-hover:flex">
            {props.summary}
          </p>

          <span className="hidden absolute bottom-[1rem] right-[1rem] group-hover:inline-block">
            {props.profile.username}
          </span>
        </div>
      </Link>
    </div>
  );
};

const CardRenderRouter: React.FC<{ viewMode: ViewMode } & ArticleCardProps> = ({
  viewMode,
  ...props
}) => {
  switch (viewMode) {
    case "card":
      return <Card {...props} />;
    case "list":
      return <List {...props} />;
    case "gallery":
      return <Gallery {...props} />;
  }
};

const ArticleCard = (props: ArticleCardProps) => {
  const { articleViewMode } = useArticleStore();

  return <CardRenderRouter viewMode={articleViewMode} {...props} />;
};

export default ArticleCard;
