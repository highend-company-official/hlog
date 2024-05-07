import { createContext, useContext, useState } from "react";
import { EditorState } from "draft-js";

type EditorContextType = [
  EditorState,
  React.Dispatch<React.SetStateAction<EditorState>>
];

export const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const editorState = useState(() => EditorState.createEmpty());

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
