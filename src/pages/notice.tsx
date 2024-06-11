import { QueryBoundary } from "@/shared";
import { Header } from "@/widgets/header";

import { NoticeList } from "@/widgets/notice";

const NoticePage = () => {
  return (
    <>
      <Header />

      <QueryBoundary>
        <NoticeList />
      </QueryBoundary>
    </>
  );
};

export default NoticePage;
