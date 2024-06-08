import { useMutation } from "@tanstack/react-query";

import { postVerifyUser } from "../api";

const usePostVerifyUser = (userId: string) =>
  useMutation({
    mutationFn: () => postVerifyUser(userId),
  });

export default usePostVerifyUser;
