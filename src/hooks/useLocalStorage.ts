import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Fetch initial value from local storage
  const getInitialValue = () => {
    if (typeof window !== "undefined") {
      const jsonValue: any = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
    }
    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  };

  const [value, setValue] = useState<T>(getInitialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
