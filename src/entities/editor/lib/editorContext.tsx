import { createContext, useContext, useState } from "react";
import { EditorState } from "draft-js";
import PrismDecorator from "draft-js-prism";
import Prism from "prismjs";

export type EditorType = {
  title: string;
  content: EditorState;
  summary: string;
  thumbnail: string;
  hasComment: boolean;
};

type EditorContextType = [
  EditorType,
  React.Dispatch<React.SetStateAction<EditorType>>
];

export const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const decorator = new PrismDecorator({
    prism: Prism,
    defaultSyntax: "javascript",
  });

  const editorState = useState<EditorType>({
    title: "",
    content: EditorState.createEmpty(decorator),
    summary: "",
    thumbnail: "",
    hasComment: true,
  });

  return (
    <EditorContext.Provider value={editorState}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const value = useContext(EditorContext) as EditorContextType;

  if (!value) {
    throw new Error(`EditorProvider 내에서 사용해야 합니다.`);
  }

  return value;
}
