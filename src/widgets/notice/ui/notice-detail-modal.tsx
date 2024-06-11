import { useGetNoticeById } from "@/entities/notice";
import { Modal } from "@/shared";

type Props = {
  isOpen: boolean;
  noticeId: string;
  close: () => void;
};

const NoticeDetailModal = ({ noticeId, isOpen, close }: Props) => {
  const { data } = useGetNoticeById(noticeId);

  return (
    <Modal open={isOpen}>
      <Modal.Header>{data.title}</Modal.Header>
      <Modal.Content>
        <p className="text-md text-pretty">{data.description}</p>
      </Modal.Content>
      <Modal.Footer align="right">
        <Modal.Button onClick={close}>닫기</Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoticeDetailModal;
