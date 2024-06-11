import { FaBell } from "react-icons/fa";

import { useGetNotices } from "@/entities/notice";
import { QueryBoundary, getElapsedTime, useOverlay } from "@/shared";
import NoticeDetailModal from "./notice-detail-modal";

const NoticeList = () => {
  const { data } = useGetNotices();
  const { open } = useOverlay();

  const handleClickNoticeItem = (noticeId: string) => {
    open(({ exit, isOpen }) => (
      <QueryBoundary>
        <NoticeDetailModal noticeId={noticeId} isOpen={isOpen} close={exit} />
      </QueryBoundary>
    ));
  };

  return (
    <>
      <header className="flex items-center  flex-col justify-center pt-20 mb-4">
        <h2 className="text-3xl font-semibold text-center">공지사항</h2>
        <p className="text-sm">
          HLOG의 새로운 소식, 개선된 내용 등을 공지사항에서 확인할 수 있습니다.
        </p>
      </header>
      <main className="grid grid-cols-12 gap-2">
        {data.map((notice) => (
          <div
            className="flex items-center col-span-6 col-start-4 p-4 rounded-md shadow-primary/10 border border-primary/30 border-solid shadow-md hover:shadow-lg cursor-pointer transition ease-in-out"
            key={notice.id}
            onClick={() => handleClickNoticeItem(notice.id)}
          >
            <FaBell size={20} className="text-primary mr-2" />
            <span className="text-md font-semibold">{notice.title}</span>
            <span className="ml-auto text-sm">
              {getElapsedTime(new Date(notice.created_at))}
            </span>
          </div>
        ))}
      </main>
    </>
  );
};

export default NoticeList;
