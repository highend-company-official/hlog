export const QUERY_CONSTS = {
  USER: "USER" as const,
  ARTICLE: "ARTICLE" as const,
  SESSION: "SESSION" as const,
  COMMENT: "COMMENT" as const,
  LIKE: "LIKE" as const,
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
  
  - 이용법에 대한 자세한 사항은 상단 툴바에 (?) 버튼을 눌러주세요
  `,
};

export const STYLE_MAPPER: { [type in string]: string } = {
  blockquote: "hlog-blockquote",
  "header-one": "hlog-header-one",
  "header-two": "hlog-header-two",
  "header-three": "hlog-header-three",
  "header-four": "hlog-header-four",
  "header-five": "hlog-header-five",
  "header-six": "hlog-header-six",
  "unordered-list-item": "hlog-unordered-list-item",
  "ordered-list-item": "hlog-ordered-list-item",
  "code-block": "hlog-code-block",
  unstyled: "hlog-paragraph",
};
