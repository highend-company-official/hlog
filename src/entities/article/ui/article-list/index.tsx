import { ImFileEmpty } from "react-icons/im";

import { useFetchArticles } from "../../lib";
import * as shared from "@/shared";
import ArticleCard from "../article-card";
import { useNavigate } from "react-router-dom";
import useArticle from "@/app/store/article";

type Props = { children: JSX.Element[] };

const CardContainer = ({ children }: Props) => {
  return <div className="flex flex-col">{children}</div>;
};
const ListContainer = ({ children }: Props) => {
  return <div className="flex flex-col">{children}</div>;
};
const GalleryContainer = ({ children }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {children}
    </div>
  );
};

const ArticleList = () => {
  const { data } = useFetchArticles();
  const navigate = useNavigate();
  const { articleViewMode } = useArticle();

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 full-w">
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
    data?.map((article) => <ArticleCard key={article.id} {...article} />) ?? [];

  return (
    <>
      <div className="mt-3" />

      <shared.If
        condition={articleViewMode === "card"}
        trueRender={<CardContainer>{articleMap}</CardContainer>}
      />

      <shared.If
        condition={articleViewMode === "gallery"}
        trueRender={<GalleryContainer>{articleMap}</GalleryContainer>}
      />

      <shared.If
        condition={articleViewMode === "list"}
        trueRender={<ListContainer>{articleMap}</ListContainer>}
      />
    </>
  );
};

export default ArticleList;
