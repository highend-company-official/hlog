import { PropsWithChildren } from "react";

import { Modal } from "@/shared";

type Props = {
  open: boolean;
  onClose: () => void;
};

const Kbd = ({ children }: PropsWithChildren) => {
  return (
    <kbd className="min-h-[30px] inline-flex justify-center items-center py-1 px-1.5 bg-gray-200 font-mono text-sm text-gray-800 rounded-md">
      {children}
    </kbd>
  );
};

const ShortcutDescriptionModal = ({ open, onClose }: Props) => {
  return (
    <Modal open={open}>
      <Modal.Content>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
            <thead className="text-xs text-white uppercase bg-primary/80">
              <tr>
                <th scope="col" className="px-6 py-3">
                  단축키
                </th>
                <th scope="col" className="px-6 py-3">
                  설명
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>1 ~ 6</Kbd>
                </th>
                <td className="px-6 py-4">
                  # 각각 1에서 6까지의 헤더 블록을 토글합니다.
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>B</Kbd>
                </th>
                <td className="px-6 py-4">
                  <span className="font-bold">볼드체</span>로 지정합니다.
                </td>
              </tr>

              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>I</Kbd>
                </th>
                <td className="px-6 py-4">
                  <span className="italic">이탈릭체</span>로 지정합니다.
                </td>
              </tr>

              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>U</Kbd>
                </th>
                <td className="px-6 py-4">
                  <span className="underline">밑줄</span>을 지정합니다.
                </td>
              </tr>

              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>Shift</Kbd> + <Kbd>O</Kbd>
                </th>
                <td className="px-6 py-4">1. 순서가 있는 목록을 지정합니다.</td>
              </tr>

              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>Shift</Kbd> + <Kbd>U</Kbd>
                </th>
                <td className="px-6 py-4">
                  <li>순서가 없는 목록을 지정합니다.</li>
                </td>
              </tr>

              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>Shift</Kbd> + <Kbd>X</Kbd>
                </th>
                <td className="px-6 py-4">
                  <span className="line-through">취소선</span>을 지정합니다.
                </td>
              </tr>

              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>Shift</Kbd> + <Kbd>Q</Kbd>
                </th>
                <td className="px-6 py-4">인용문을 토글합니다.</td>
              </tr>

              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>Shift</Kbd> + <Kbd>C</Kbd>
                </th>
                <td className="px-6 py-4">코드 블록을 토글합니다.</td>
              </tr>

              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                >
                  (<Kbd>Command</Kbd>
                  <span className="mx-2">or</span>
                  <Kbd>Ctrl</Kbd>) + <Kbd>S</Kbd>
                </th>
                <td className="px-6 py-4">내용을 저장합니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Content>
      <Modal.Footer align="right">
        <Modal.Button onClick={onClose}>닫기</Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShortcutDescriptionModal;
