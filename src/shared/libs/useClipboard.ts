import { useToastStore } from "@/app/store";

const useClipboard = () => {
  const { addToast } = useToastStore();

  /**
   *
   * @returns 클립보드의 값을 리턴
   */
  const read = async () => {
    try {
      // Typescript에서 clipboard-read를 지원하지 않아 ignore 처리함.
      const { state } = await navigator.permissions.query({
        // @ts-ignore
        name: "clipboard-read",
      });

      if (state === "denied") {
        addToast({
          type: "warning",
          content: "클립보드 접근 권한에 동의해주세요.",
          hasCloseButton: true,
        });
        throw new DOMException("NotAllowedError");
      }

      const value = await navigator.clipboard.readText();

      return value;
    } catch (error) {
      if (error instanceof DOMException) {
        addToast({
          type: "error",
          content: "클립보드 오류가 발생했습니다.",
          hasCloseButton: true,
        });
        throw new DOMException("NotAllowedError");
      }

      throw error;
    }
  };

  const copyFallback = (text: string) => {
    const textarea = document.createElement("textarea");
    Object.assign(textarea, { value: text });

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, `${text}`.length);

    document.execCommand("copy");
    document.body.removeChild(textarea);

    addToast({
      type: "success",
      content: "클립보드에 복사하였습니다.",
      hasCloseButton: true,
      staleTime: 3000,
    });

    return true;
  };

  /**
   *
   * @param value 클립보드에 복사할 값
   */
  const write = (text: string) => {
    if (!window.navigator.clipboard) {
      return copyFallback(text);
    }

    window.navigator.clipboard
      .writeText(text)
      .then(() => {
        addToast({
          type: "success",
          content: "클립보드에 복사하였습니다.",
          hasCloseButton: true,
          staleTime: 3000,
        });
      })
      .catch(() => {
        copyFallback(text);
      });

    return true;
  };

  /**
   *
   * @param event 클립보드 이벤트
   * @param successFallback 클립보드 읽기를 성공했을 때 Fallback
   * @param failureFallback 클립보드 읽기를 실패했을 때 Fallback
   */
  const handleDetectPaste = async (
    event: Event,
    successFallback: (value: string) => void,
    failureFallback?: (error: unknown) => void
  ) => {
    const e = event as ClipboardEvent;
    // TextField에서 발생하는 키보드 동작으로 인해 오동작하지 않도록 함
    const { nodeName } = e.target as HTMLElement;
    if (["INPUT", "TEXTAREA"].includes(nodeName.toUpperCase())) {
      return;
    }

    try {
      const clipText = await read();
      const value = clipText.replace(/[“”]/g, '"');

      successFallback(value);
    } catch (error: unknown) {
      failureFallback?.(error);
      if (error instanceof DOMException) {
        addToast({
          type: "error",
          content: "클립보드 오류가 발생했습니다.",
          hasCloseButton: true,
        });
      }
    }
  };

  return {
    read,
    write,
    handleDetectPaste,
  };
};

export default useClipboard;
