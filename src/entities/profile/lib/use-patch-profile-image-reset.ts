import { useMutation } from "@tanstack/react-query";

import { patchProfileImageReset } from "../api";

const usePatchProfileImageReset = (userId: string, profileUrl: string) =>
  useMutation({
    mutationFn: () => patchProfileImageReset(userId, profileUrl),
  });

export default usePatchProfileImageReset;
