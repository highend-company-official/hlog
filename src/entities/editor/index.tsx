import { Suspense } from "react";

import * as shared from "@/shared";

import { EditorProvider } from "./lib";
import EditorCore from "./ui/core";
import Toolbar from "./ui/toolbar";

const Core = () => {
  return (
    <EditorProvider>
      <Suspense fallback={<shared.Skeleton />}>
        <Toolbar />
        <EditorCore />
      </Suspense>
    </EditorProvider>
  );
};

export default Core;
