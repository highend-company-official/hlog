import { ImFileEmpty } from "react-icons/im";
import { useNavigate } from "react-router-dom";

import * as shared from "@/shared";

import { useArticleStore, ViewMode, useGetArticles } from "@/entities/article";
import ArticleCard from "./article-card";

const CardContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};
const ListContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};
const GalleryContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

const ContainerRouter: React.FC<
  { viewMode: ViewMode } & React.PropsWithChildren
> = ({ children, viewMode }) => {
  switch (viewMode) {
    case "card":
      return <CardContainer>{children}</CardContainer>;
    case "list":
      return <ListContainer>{children}</ListContainer>;
    case "gallery":
      return <GalleryContainer>{children}</GalleryContainer>;
  }
};

const ArticleList = () => {
  const navigate = useNavigate();
  const { articleViewMode, sortType } = useArticleStore();
  const { data } = useGetArticles(sortType);

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

  return (
    <>
      <div className="mt-3" />

      <ContainerRouter viewMode={articleViewMode}>
        {data.map((articleData) => (
          <ArticleCard key={articleData.id} {...articleData} />
        ))}
      </ContainerRouter>
    </>
  );
};

export default ArticleList;
