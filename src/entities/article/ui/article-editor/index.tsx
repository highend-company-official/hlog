import { useEffect, useRef } from "react";
import {
  MDXEditor,
  headingsPlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import * as shared from "@/shared";

const ArticleEditor = () => {
  const { write } = shared.useClipboard();
  const textRef = useRef<MDXEditorMethods>(null);

  const handleChangeEditor = (value: string) => {
    console.log(value);
  };

  const handleCopyEditor = () => {
    const markdownValue = textRef.current?.getMarkdown();

    write(markdownValue ?? "");
  };

  useEffect(() => {
    textRef.current?.focus();
  }, []);

  return (
    <>
      <div>
        <button onClick={handleCopyEditor}>값 복사하기</button>
      </div>
      <MDXEditor
        markdown={"# Hello World"}
        plugins={[headingsPlugin()]}
        ref={textRef}
        onChange={handleChangeEditor}
      />
    </>
  );
};

export default ArticleEditor;
