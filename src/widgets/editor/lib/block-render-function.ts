import { ContentBlock, ContentState } from "draft-js";
import { Image } from "../ui/custom-block";

export const blockRenderFn = (
  block: ContentBlock,
  contentState: ContentState,
  props?: unknown
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
