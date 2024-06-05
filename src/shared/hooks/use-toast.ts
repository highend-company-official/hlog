import { useMemo } from "react";

import { useToastStore, type ToastType } from "@/app/model";
import { generateRandomId } from "../libs";

const useToast = () => {
  const { mount, unmount } = useToastStore();

  const generatedId = generateRandomId();

  return useMemo(
    () => ({
      open: (newToast: ToastType) => mount(generatedId, newToast),
      exit: () => unmount(generatedId),
    }),
    []
  );
};

export default useToast;
