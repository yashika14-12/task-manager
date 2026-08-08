import { useEffect, useState } from 'react';

function readValue(key, initialValue) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : initialValue;
  } catch (error) {
    console.warn(`useLocalStorage: failed to read key "${key}"`, error);
    return initialValue;
  }
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`useLocalStorage: failed to write key "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
