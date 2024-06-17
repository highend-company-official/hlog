import { QueryBoundary, SEO } from "@/shared";
import { Header } from "@/widgets/header";

import { NoticeList } from "@/widgets/notice";

const NoticePage = () => {
  return (
    <>
      <SEO
        title="HLOG | 공지사항"
        keywords="기술 블로그, 최신 기술 뉴스, 튜토리얼, 프로그래밍, 소프트웨어 개발, AI, 머신러닝, 데이터 과학"
      />
      <Header />

      <QueryBoundary>
        <NoticeList />
      </QueryBoundary>
    </>
  );
};

export default NoticePage;
