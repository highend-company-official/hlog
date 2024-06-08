import { createQueryKeys } from "@lukemorales/query-key-factory";

const commentKeyFactor = createQueryKeys("comment", {
  list: (articleId: string) => [articleId],
});

export default commentKeyFactor;
