import { ImFileEmpty } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import * as shared from "@/shared";

import {
  useArticleStore,
  useGetArticles,
  type ViewMode,
} from "@/entities/article";
import { useEffect } from "react";

const CardContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="gap-4 grid grid-cols-2 max-md:grid-cols-1 auto-rows-[minmax(600px)]">
      {children}
    </div>
  );
};

const ListContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};
const GalleryContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="gap-4 grid grid-cols-2 max-md:grid-cols-1 auto-rows-[minmax(0,300px)]">
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

type ArticleListProps = {
  cardComponent: React.FC<
    shared.ArrayElement<ReturnType<typeof useGetArticles>["data"]["pages"][0]>
  >;
};

const ArticleList = ({ cardComponent: ArticleCard }: ArticleListProps) => {
  const navigate = useNavigate();
  const { articleViewMode, filter } = useArticleStore();
  const { data: articles, fetchNextPage } = useGetArticles({
    categories: filter.categories,
    sortType: filter.sortType,
    page: 0,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const articleList = articles?.pages?.flat();

  if (articleList.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center mt-32 w-full">
        <ImFileEmpty size={100} />

        <h3 className="mt-12 font-bold text-2xl">준비된 게시글이 없습니다.</h3>
        <span className="my-5 text-sm">HLOG에 기여해주세요.</span>
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
        {articleList.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}

        <div ref={ref} />
      </ContainerRouter>
    </>
  );
};

export default ArticleList;
