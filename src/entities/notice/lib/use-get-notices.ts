import { useSuspenseQuery } from "@tanstack/react-query";

import { noticeKeyFactor } from "../query";
import { getNotices } from "../api";

const useGetNotices = () => {
  const queryKey = noticeKeyFactor.list.queryKey;
  const queryFn = async () => {
    const response = await getNotices();
    return response;
  };

  return useSuspenseQuery({
    queryKey,
    queryFn,
  });
};

export default useGetNotices;
