import { useCallback, useEffect, useRef, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const skippedWriteRef = useRef(false);

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (skippedWriteRef.current) {
      skippedWriteRef.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.warn(`Error writing localStorage key "${key}":`, err);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      skippedWriteRef.current = true;
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (err) {
      console.warn(`Error removing localStorage key "${key}":`, err);
    }
  }, [key, initialValue]);

  return [storedValue, setStoredValue, removeValue];
}