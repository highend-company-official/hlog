import { useMutation } from "@tanstack/react-query";
import {
  patchProfileImage,
  patchProfileImageReset,
  patchProfileInfo,
  type InfoType,
} from "../api";

export const usePatchProfileImageReset = (userId: string, profileUrl: string) =>
  useMutation({
    mutationFn: () => patchProfileImageReset(userId, profileUrl),
  });

export const usePatchProfileImage = (userId: string) =>
  useMutation({
    mutationFn: (profile: File) => patchProfileImage(userId, profile),
  });

export const usePatchProfileInfo = (userId: string) =>
  useMutation({
    mutationFn: (info: InfoType) => patchProfileInfo(userId, info),
  });
