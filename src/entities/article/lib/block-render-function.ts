import { ContentBlock, ContentState } from "draft-js";
import { CodeBlock, Image } from "../ui/custom-block";

const blockRenderFn = (
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

    if (type === "code-block") {
      return {
        component: CodeBlock,
        editable: true,
      };
    }

    return null;
  }

  return null;
};

export default blockRenderFn;
