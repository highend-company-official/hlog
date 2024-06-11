import { useBeforeunload } from "react-beforeunload";

import * as shared from "@/shared";

import { PublishArticleModal } from "@/features/publish-article";
import {
  ArticleTitleInput,
  EditorCore,
  SavedContentLoadModal,
  Toolbar,
  useEditorUtils,
} from "@/widgets/editor";

const ArticleWriteContainer = () => {
  const { open: openPublishModal } = shared.useOverlay();
  const { open: openLoadSavedContentModal } = shared.useOverlay();
  const { loadSavedEditorMetaData } = useEditorUtils();

  const handleClickPublish = () => {
    openPublishModal(({ isOpen, exit }) => (
      <PublishArticleModal open={isOpen} onClose={exit} />
    ));
  };

  useBeforeunload((event) => event.preventDefault());

  shared.useMount(() => {
    if (loadSavedEditorMetaData()) {
      openLoadSavedContentModal(({ exit, isOpen }) => (
        <SavedContentLoadModal open={isOpen} onClose={exit} />
      ));
    }
  });

  return (
    <>
      <div className="min-h-screen pt-20 bg-slate-200">
        <Toolbar onPulish={handleClickPublish} />

        <div className="max-w-[1000px] mx-auto py-14 px-24 bg-white h-full">
          <ArticleTitleInput />
          <shared.Divider />
          <div className="mt-7" />
          <shared.QueryBoundary>
            <EditorCore />
          </shared.QueryBoundary>
        </div>
      </div>
    </>
  );
};

export default ArticleWriteContainer;
