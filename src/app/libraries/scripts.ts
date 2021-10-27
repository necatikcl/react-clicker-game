import { useState } from "react";
export const print = (text: string, type: "success" | "error" | "info") => {
  let color = "";
  switch (type) {
    case "error":
      color = "red";
      break;
    case "info":
      color = "blue";
      break;
    default:
      color = "green";
      break;
  }
  console.log(
    `%c${type.toUpperCase()}` + ` %c${text}`,
    `color: white; background: ${color}; text-align:center; padding-left: 8px; margin-right: 5px`,
    "color: white"
  );
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
