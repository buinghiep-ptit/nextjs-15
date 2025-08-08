"use client";

import { useState, useCallback } from "react";

export function useToggle(
  initialValue = false
): [boolean, () => void, (value?: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setToggle = useCallback(
    (newValue?: boolean) => {
      setValue(newValue !== undefined ? newValue : !value);
    },
    [value]
  );

  return [value, toggle, setToggle];
}

// Hook for multiple toggles
export function useToggles<T extends Record<string, boolean>>(
  initialValues: T
): [T, (key: keyof T) => void, (updates: Partial<T>) => void] {
  const [values, setValues] = useState(initialValues);

  const toggle = useCallback((key: keyof T) => {
    setValues((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const setToggles = useCallback((updates: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...updates }));
  }, []);

  return [values, toggle, setToggles];
}
