import { ImFileEmpty } from "react-icons/im";
import { useNavigate } from "react-router-dom";

import * as shared from "@/shared";

import {
  useArticleStore,
  useGetArticles,
  type ViewMode,
} from "@/entities/article";

const CardContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid gap-4 auto-rows-[minmax(0,600px)] grid-cols-2 max-md:grid-cols-1">
      {children}
    </div>
  );
};

const ListContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};
const GalleryContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid gap-4 auto-rows-[minmax(0,300px)] grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
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
  cardComponent: React.FC<Omit<shared.ArticleType, "body" | "verified">>;
};

const ArticleList = ({ cardComponent: ArticleCard }: ArticleListProps) => {
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
