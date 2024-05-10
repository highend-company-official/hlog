import { Suspense } from "react";
import { useBeforeunload } from "react-beforeunload";

import * as shared from "@/shared";

import { EditorProvider } from "@/entities/editor/lib";
import { Toolbar, TitleInput, EditorCore } from "@/entities/editor/ui";

const ArticleWrite = () => {
  useBeforeunload((event) => event.preventDefault());

  return (
    <div className="relative min-h-screen pt-20 bg-slate-200">
      <EditorProvider>
        <Suspense fallback={<shared.Skeleton />}>
          <Toolbar />

          <div className="w-[1000px] mx-auto py-14 px-24 bg-white h-full">
            <TitleInput />
            <shared.Divider />
            <div className="mt-7" />
            <EditorCore />
          </div>
        </Suspense>
      </EditorProvider>
    </div>
  );
};

export default ArticleWrite;
