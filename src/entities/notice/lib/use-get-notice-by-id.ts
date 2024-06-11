import { useSuspenseQuery } from "@tanstack/react-query";

import { noticeKeyFactor } from "../query";
import { getNoticeById } from "../api";

const useGetNoticeById = (id: string) => {
  const queryKey = noticeKeyFactor.detail(id).queryKey;
  const queryFn = async () => {
    const response = await getNoticeById(id);
    return response;
  };

  return useSuspenseQuery({
    queryKey,
    queryFn,
  });
};

export default useGetNoticeById;
