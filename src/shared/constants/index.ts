export const QUERY_CONSTS = {
  USER: "USER" as const,
  ARTICLE: "ARTICLE" as const,
  SESSION: "SESSION" as const,
  COMMENT: "COMMENT" as const,
};

export const STORAGE_CONSTS = {
  HLOG_EDITOR: "HLOG_EDITOR" as const,
};

export const PORTAL_CONSTS = {
  MODAL: "modal-portal" as const,
  TOAST: "toast-portal" as const,
};

export const EDITOR_CONST = {
  PLACEHOLDER: `본문을 입력해주세요...
  
- Ctrl + B (또는 Cmd + B): 선택된 텍스트를 굵게 표시합니다.
- Ctrl + I (또는 Cmd + I): 선택된 텍스트를 이탤릭체로 표시합니다.
- Ctrl + U (또는 Cmd + U): 선택된 텍스트에 밑줄을 추가합니다.
- Ctrl + Z (또는 Cmd + Z): 최근의 작업을 취소합니다.
- Ctrl + Y (또는 Cmd + Y): 취소된 작업을 다시 실행합니다.
  `,
};
