import * as shared from "@/shared";
import { ArticleEditor } from "@/entities/article";

const ArticleWrite = () => {
  return (
    <>
      <h1>글쓰기 페이지</h1>

      <shared.Divider />

      <ArticleEditor />
    </>
  );
};

export default ArticleWrite;
