import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";

import * as shared from "@/shared";

import { EditArticleModal } from "@/features/edit-article";
import { useEditorStore, useGetArticleById } from "@/entities/article";
import {
  ArticleTitleInput,
  EditorCore,
  Toolbar,
  useEditorUtils,
} from "@/widgets/editor";

const ArticleEditContainer = () => {
  const params = useParams<{ article_id: string }>();
  const { open: openEditOverlay } = shared.useOverlay();
  const { setEditorMetaData, setContent } = useEditorStore();
  const { parseSavedContentToState, saveCurrentContent } = useEditorUtils();

  const { data } = useGetArticleById(params.article_id!);

  const handleClickEdit = () => {
    openEditOverlay(({ isOpen, exit }) => (
      <EditArticleModal open={isOpen} onClose={exit} />
    ));
  };

  useEffect(
    function hydrateValues() {
      if (data) {
        setEditorMetaData({
          summary: data.summary ?? "",
          title: data.title ?? "",
          hasComment: data.has_comments ?? true,
          hasHit: data.has_hit ?? true,
          hasLike: data.has_like ?? true,
          category: data.categories ?? [],
          thumbnail: null, // FIXME
        });

        setContent(parseSavedContentToState(data.body ?? ""));
      }
    },
    [data, parseSavedContentToState, setContent, setEditorMetaData]
  );

  useEffect(
    function autoSave() {
      const interval = setInterval(() => {
        saveCurrentContent();
      }, 30000);

      return () => {
        clearInterval(interval);
      };
    },
    [saveCurrentContent]
  );

  useBeforeunload((event) => event.preventDefault());

  return (
    <div className="min-h-screen pt-20 bg-slate-200">
      <Toolbar onPulish={handleClickEdit} />

      <div className="max-w-[1000px] mx-auto py-14 px-24 bg-white h-full">
        <ArticleTitleInput />
        <shared.Divider />
        <div className="mt-7" />
        <shared.QueryBoundary>
          <EditorCore />
        </shared.QueryBoundary>
      </div>
    </div>
  );
};

export default ArticleEditContainer;
