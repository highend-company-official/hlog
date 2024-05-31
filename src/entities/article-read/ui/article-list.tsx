import { useNavigate } from "react-router-dom";
import { ImFileEmpty } from "react-icons/im";

import * as shared from "@/shared";

import ArticleCard from "./article-card";

import { useGetArticles } from "../lib";
import useArticleStore, { type ViewMode } from "../model";

type Props = { children: JSX.Element[] };

const CardContainer = ({ children }: Props) => {
  return <div className="flex flex-col">{children}</div>;
};
const ListContainer = ({ children }: Props) => {
  return <div className="flex flex-col">{children}</div>;
};
const GalleryContainer = ({ children }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

const ArticleList = ({ viewMode }: { viewMode: ViewMode }) => {
  const { sortType } = useArticleStore();
  const { data } = useGetArticles(sortType);
  const navigate = useNavigate();

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full mt-32">
        <ImFileEmpty size={180} />

        <h3 className="mt-12 text-4xl">준비된 게시글이 없습니다.</h3>
        <span className="my-5">HLOG에 기여해주세요.</span>
        <shared.Button onClick={() => navigate("/article-write")}>
          글 작성
        </shared.Button>
      </div>
    );
  }

  const articleMap =
    data?.map((article) => (
      <ArticleCard viewMode={viewMode} key={article.id} {...article} />
    )) ?? [];

  return (
    <>
      <div className="mt-3" />

      <shared.If
        condition={viewMode === "card"}
        trueRender={<CardContainer>{articleMap}</CardContainer>}
      />

      <shared.If
        condition={viewMode === "gallery"}
        trueRender={<GalleryContainer>{articleMap}</GalleryContainer>}
      />

      <shared.If
        condition={viewMode === "list"}
        trueRender={<ListContainer>{articleMap}</ListContainer>}
      />
    </>
  );
};

export default ArticleList;
