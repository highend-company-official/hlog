import { Suspense, useState } from "react";
import { useBeforeunload } from "react-beforeunload";

import * as shared from "@/shared";

import { Toolbar, TitleInput, EditorCore } from "@/entities/editor/ui";
import "@/shared/styles/index.css";
import PublishSettingModal from "@/features/article/publish-article/ui/publish-setting-modal";

const ArticleWrite = () => {
  const [isOpenPublishModal, setIsOpenPublishModal] = useState(false);

  useBeforeunload((event) => event.preventDefault());

  return (
    <>
      <div className="relative min-h-screen pt-20 bg-slate-200">
        <Suspense fallback={<shared.Skeleton />}>
          <Toolbar onPulish={() => setIsOpenPublishModal(true)} />

          <div className="max-w-[1000px] mx-auto py-14 px-24 bg-white h-full">
            <TitleInput />
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
