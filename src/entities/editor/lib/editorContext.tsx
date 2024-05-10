import { createContext, useContext, useState } from "react";
import { EditorState } from "draft-js";

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
  const editorState = useState<EditorType>({
    title: "",
    content: EditorState.createEmpty(),
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

export const useEditorContext = () => {
  const value = useContext(EditorContext) as EditorContextType;

  if (!value) {
    throw new Error(`EditorProvider 내에서 사용해야 합니다.`);
  }

  return value;
};
