import { useMutation } from "@tanstack/react-query";
import { InfoType, patchProfileInfo } from "../api";

const usePatchProfileInfo = (userId: string) =>
  useMutation({
    mutationFn: (info: InfoType) => patchProfileInfo(userId, info),
  });

export default usePatchProfileInfo;
