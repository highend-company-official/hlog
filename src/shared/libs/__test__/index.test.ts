import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

import isProviderURL from "../is-provider-url";
import getElapsedTime from "../get-elapsed-time";
import generateRandomId from "../generate-random-id";

describe("isProviderURL", () => {
  it("함수는 https://로 시작할 때 true를 반환해야 합니다.", () => {
    const URL = "https://tech-hlog.vercel.app/";
    expect(isProviderURL(URL)).toBe(true);
  });
  it("함수는 https://로 시작하지 않을 때 false를 반환해야 합니다.", () => {
    const URL = "http://tech-hlog.vercel.app/";
    expect(isProviderURL(URL)).toBe(false);
  });
});

describe("getElapsedTime", () => {
  it('현재 시간에 대해 "몇 초 전"을 반환해야 합니다', () => {
    const now = new Date();
    expect(getElapsedTime(now)).toBe("몇 초 전");
  });

  it('1분 전 시간에 대해 "1분 전"을 반환해야 합니다', () => {
    const oneMinuteAgo = dayjs().subtract(1, "minute").toDate();
    expect(getElapsedTime(oneMinuteAgo)).toBe("1분 전");
  });

  it('1시간 전 시간에 대해 "1시간 전"을 반환해야 합니다', () => {
    const oneHourAgo = dayjs().subtract(1, "hour").toDate();
    expect(getElapsedTime(oneHourAgo)).toBe("한 시간 전");
  });

  it('하루 전 시간에 대해 "하루 전"을 반환해야 합니다', () => {
    const oneDayAgo = dayjs().subtract(1, "day").toDate();
    expect(getElapsedTime(oneDayAgo)).toBe("하루 전");
  });

  it('1개월 전 시간에 대해 "1개월 전"을 반환해야 합니다', () => {
    const oneMonthAgo = dayjs().subtract(1, "month").toDate();
    expect(getElapsedTime(oneMonthAgo)).toBe("한 달 전");
  });

  it('1년 전 시간에 대해 "1년 전"을 반환해야 합니다', () => {
    const oneYearAgo = dayjs().subtract(1, "year").toDate();
    expect(getElapsedTime(oneYearAgo)).toBe("일 년 전");
  });
});

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("generateRandomId 함수 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("기본적으로 단일 UUID를 생성해야 합니다", () => {
    const mockUuid = "123e4567-e89b-12d3-a456-426614174000";
    (uuid as jest.Mock).mockReturnValue(mockUuid);

    const result = generateRandomId();
    expect(result).toBe(mockUuid);
    expect(uuid).toHaveBeenCalledTimes(1);
  });

  it("count 옵션이 제공되었을 때 다수의 UUID를 생성해야 합니다", () => {
    const mockUuids = [
      "123e4567-e89b-12d3-a456-426614174001",
      "123e4567-e89b-12d3-a456-426614174002",
      "123e4567-e89b-12d3-a456-426614174003",
    ];
    (uuid as jest.Mock).mockImplementation(() => mockUuids.shift());

    const count = 3;
    const result = generateRandomId({ count });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(count);
    result.forEach((id) => {
      expect(typeof id).toBe("string");
    });
    expect(uuid).toHaveBeenCalledTimes(count);
  });

  it("count가 1일 때 단일 UUID를 생성해야 합니다", () => {
    const mockUuid = "123e4567-e89b-12d3-a456-426614174000";
    (uuid as jest.Mock).mockReturnValue(mockUuid);

    const result = generateRandomId({ count: 1 });
    expect(result).toBe(mockUuid);
    expect(uuid).toHaveBeenCalledTimes(1);
  });

  it("count가 0일 때 단일 UUID를 생성해야 합니다", () => {
    const mockUuid = "123e4567-e89b-12d3-a456-426614174000";
    (uuid as jest.Mock).mockReturnValue(mockUuid);

    const result = generateRandomId({ count: 0 });
    expect(result).toBe(mockUuid);
    expect(uuid).toHaveBeenCalledTimes(1);
  });
});
