import { createQueryKeys } from "@lukemorales/query-key-factory";

export const noticeKeyFactor = createQueryKeys("notice", {
  list: null,
  top: null,
  detail: (id: string) => [id],
});
