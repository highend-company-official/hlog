import { Modal, Blockquote } from "@/shared";

const SendEmailModal = () => {
  return (
    <Modal>
      <Modal.Header>
        HLOG에서 해당 기능을 사용하시려면 이메일 인증을 해야압니다.
      </Modal.Header>
      <Modal.Content>
        <Blockquote>
          아래 이메일 주소를 남겨주시면 검토 후 조속히 처리하겠습니다.
        </Blockquote>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@example.com"
            required
          />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default SendEmailModal;
