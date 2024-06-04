import { v4 as uuid } from "uuid";

type Option = {
  count?: number; // count가 선택적(optional) 매개변수임을 나타냅니다.
};

function generateRandomId(): string;
function generateRandomId(options?: Option): string[];

function generateRandomId(options?: Option) {
  const count = options?.count; // 옵션 객체에서 count 속성을 가져옵니다.

  if (count && count > 1) {
    return Array(count)
      .fill(0)
      .map(() => uuid());
  }

  return uuid();
}

export default generateRandomId;
