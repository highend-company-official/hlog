import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [savedValue, setSavedValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Key에 해당하는 값을 가져오지 못했습니다.");
      return initialValue;
    }
  });

  const setter = (value: T | ((val: T) => T)) => {
    try {
      const processedValue =
        value instanceof Function ? value(savedValue) : value;
      setSavedValue(processedValue);

      window.localStorage.setItem(key, JSON.stringify(processedValue));
    } catch (error) {
      throw new Error(`${key}:: LocalStorage 저장에 실패했습니다`);
    }
  };

  return [savedValue, setter];
};

export default useLocalStorage;
