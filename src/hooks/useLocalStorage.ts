import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    // Check if window object is available (i.e., we're in the browser)
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);

      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      // If not in the browser, return the initial value
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }
  });

  useEffect(() => {
    // Check if window object is available (i.e., we're in the browser)
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
