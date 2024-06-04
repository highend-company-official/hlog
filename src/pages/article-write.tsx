import { Suspense } from "react";
import { useBeforeunload } from "react-beforeunload";

import * as shared from "@/shared";

import { PublishArticleModal } from "@/features/publish-article";
import { ArticleTitleInput, EditorCore, Toolbar } from "@/widgets/editor";

const ArticleWrite = () => {
  const { open: openPublishModal } = shared.useOverlay();

  const handleClickPublish = () => {
    openPublishModal(({ isOpen, exit }) => (
      <PublishArticleModal open={isOpen} onClose={exit} />
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
            <EditorCore />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default ArticleWrite;
