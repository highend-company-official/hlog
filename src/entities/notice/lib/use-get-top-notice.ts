import { useSuspenseQuery } from "@tanstack/react-query";

import { noticeKeyFactor } from "../query";
import { getTopNotice } from "../api";

const useGetTopNotice = () => {
  const queryKey = noticeKeyFactor.top.queryKey;
  const queryFn = async () => {
    const response = await getTopNotice();
    return response;
  };

  return useSuspenseQuery({
    queryKey,
    queryFn,
  });
};

export default useGetTopNotice;
