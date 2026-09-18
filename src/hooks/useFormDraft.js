import { useState } from "react";

export function useFormDraft(key, initialValues) {
  const [values, setValues] = useState(() => {
    try {
      const raw = sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValues;
    } catch {
      return initialValues;
    }
  });

  function updateValues(next) {
    setValues(next);
    try {
      sessionStorage.setItem(key, JSON.stringify(next));
    } catch {}
  }

  function clearDraft() {
    try {
      sessionStorage.removeItem(key);
    } catch {}
    setValues(initialValues);
  }

  return [values, updateValues, clearDraft];
}
