import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const getElapsedTime = (date: Date) => {
  return dayjs().to(dayjs(date).format("YYYY-MM-DD HH:mm:ss"));
};

export default getElapsedTime;
