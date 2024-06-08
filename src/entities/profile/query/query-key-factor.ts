import { createQueryKeys } from "@lukemorales/query-key-factory";

const profileKeyFactor = createQueryKeys("profile", {
  list: null,
  detail: (userId: string) => [userId],
});

export default profileKeyFactor;
