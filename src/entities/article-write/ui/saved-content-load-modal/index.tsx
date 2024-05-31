import { EditorState } from "draft-js";
import useEditorStore from "@/entities/article-write/model";

import { Modal } from "@/shared";
import useEditorUtils from "../../hooks";

type Props = {
  onCancel: () => void;
  onLoad: () => void;
};

const SaveLoadModal = ({ onCancel, onLoad }: Props) => {
  const { loadSavedContent } = useEditorUtils();
  const { setEditorMetaData } = useEditorStore();

  const loadContentToEditor = () => {
    const loadedContent = loadSavedContent();

    if (loadedContent) {
      setEditorMetaData({
        ...loadedContent,
        content: EditorState.createWithContent(loadedContent.content),
      });
      onLoad();
    }
  };

  return (
    <Modal>
      <Modal.Header>이전에 작성된 글이 있습니다.</Modal.Header>
      <Modal.Content>해당 글을 불러오시겠습니까?</Modal.Content>
      <Modal.Footer align="right">
        <Modal.Button type="normal" onClick={onCancel}>
          아니요
        </Modal.Button>
        <div className="ml-2" />
        <Modal.Button type="accept" onClick={loadContentToEditor}>
          네
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveLoadModal;
