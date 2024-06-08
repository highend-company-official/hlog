import { createQueryKeys } from "@lukemorales/query-key-factory";

const authKeyFactor = createQueryKeys("auth", {
  session: null,
});

export default authKeyFactor;
