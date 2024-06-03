import {
  AtomicBlockUtils,
  ContentBlock,
  ContentState,
  EditorState,
} from "draft-js";

import { supabase } from "@/shared";
import { Image } from "../ui/custom-block";

type InsertImageParams = {
  url: string;
  editorState: EditorState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraData?: any;
};

export const addImage = ({
  editorState,
  url,
  extraData,
}: InsertImageParams) => {
  const urlType = "image";
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    urlType,
    "IMMUTABLE",
    { ...extraData, src: url }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    " "
  );

  return EditorState.forceSelection(
    newEditorState,
    newEditorState.getCurrentContent().getSelectionAfter()
  );
};

type UploadImageParams = {
  path: string;
  file: File;
  successCb: (url: string) => void;
  errorCb: (error: string) => void;
};

export const uploadImage = async ({
  path,
  file,
  successCb,
  errorCb,
}: UploadImageParams) => {
  try {
    const { data, error } = await supabase.storage
      .from("articles")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const generatedPath = data?.path;

    if (path) {
      successCb(generatedPath ?? "");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errorCb(error.message);
  }
};

export const blockRenderFn = (
  block: ContentBlock,
  contentState: ContentState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any
) => {
  if (block.getType() === "atomic") {
    const entity = block.getEntityAt(0);
    if (!entity) return null;
    const type = contentState.getEntity(entity).getType();

    if (type === "image") {
      return {
        component: Image,
        editable: false,
        props,
      };
    }
    return null;
  }

  return null;
};
