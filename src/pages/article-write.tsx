import { Suspense, useState } from "react";
import { useBeforeunload } from "react-beforeunload";

import * as shared from "@/shared";

import Toolbar from "@/entities/article-write/ui/toolbar";
import ArticleTitleInput from "@/entities/article-write/ui/title-input";
import EditorCore from "@/entities/article-write/ui/editor-core";

import { PublishSettingModal } from "@/features/article-read/ui/publish-article";

import "@/shared/styles/index.css";

const ArticleWrite = () => {
  const [isOpenPublishModal, setIsOpenPublishModal] = useState(false);

  useBeforeunload((event) => event.preventDefault());

  return (
    <>
      <div className="min-h-screen pt-20 bg-slate-200">
        <Suspense fallback={<shared.Skeleton />}>
          <Toolbar onPulish={() => setIsOpenPublishModal(true)} />

          <div className="max-w-[1000px] mx-auto py-14 px-24 bg-white h-full">
            <ArticleTitleInput />
            <shared.Divider />
            <div className="mt-7" />
            <EditorCore />
          </div>
        </Suspense>
      </div>

      {isOpenPublishModal && (
        <PublishSettingModal onClose={() => setIsOpenPublishModal(false)} />
      )}
    </>
  );
};

export default ArticleWrite;
