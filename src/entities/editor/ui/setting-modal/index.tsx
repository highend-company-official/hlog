import { Modal } from "@/shared";
import useEditor from "../../hooks";

type Props = {
  onCancel: () => void;
};

const SettingModal = ({ onCancel }: Props) => {
  const {
    editorState: { title },
  } = useEditor();

  return (
    <Modal>
      <Modal.Content>
        <h3>{title}을 발행하기 전에 몇가지 설정을 해주세요.</h3>

        <ul>
          <li>아티클 썸네일</li>
          <li>아티클 요약 내용 (필수 아님)</li>
          <li>댓글 포함여부 (기본은 true)</li>
        </ul>
      </Modal.Content>
      <Modal.Footer align="right">
        <Modal.Button type="normal" onClick={onCancel}>
          취소
        </Modal.Button>
        <div className="ml-2" />
        <Modal.Button type="accept">발행</Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingModal;
