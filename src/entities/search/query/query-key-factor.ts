import { createQueryKeys } from "@lukemorales/query-key-factory";

export const searchKeyFactor = createQueryKeys("search", {
  articleSearchList: (search: string) => ["article", search],
  profileSearchList: (search: string) => ["profile", search],
});
