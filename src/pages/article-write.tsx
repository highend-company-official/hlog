import { Suspense } from "react";
import { useBeforeunload } from "react-beforeunload";

import { PublishSettingModal } from "@/features/article-read/ui/publish-article";
import ArticleTitleInput from "@/entities/article-write/ui/title-input";
import Toolbar from "@/entities/article-write/ui/toolbar";
import WriteEditor from "@/entities/article-write/ui/write-editor";
import * as shared from "@/shared";

import useOverlay from "@/shared/hooks/use-overlay";

import "@/shared/styles/index.css";

const ArticleWrite = () => {
  const { open: openPublishModal } = useOverlay();

  const handleClickPublish = () => {
    openPublishModal(({ isOpen, exit }) => (
      <PublishSettingModal open={isOpen} onClose={exit} />
    ));
  };

  useBeforeunload((event) => event.preventDefault());

  return (
    <>
      <div className="min-h-screen pt-20 bg-slate-200">
        <Suspense fallback={<shared.Skeleton />}>
          <Toolbar onPulish={handleClickPublish} />

          <div className="max-w-[1000px] mx-auto py-14 px-24 bg-white h-full">
            <ArticleTitleInput />
            <shared.Divider />
            <div className="mt-7" />
            <WriteEditor />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default ArticleWrite;
