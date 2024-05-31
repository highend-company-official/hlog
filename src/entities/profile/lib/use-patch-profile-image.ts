import { useMutation } from "@tanstack/react-query";

import { patchProfileImage } from "../api";

const usePatchProfileImage = (userId: string) =>
  useMutation({
    mutationFn: (profile: File) => patchProfileImage(userId, profile),
  });

export default usePatchProfileImage;
