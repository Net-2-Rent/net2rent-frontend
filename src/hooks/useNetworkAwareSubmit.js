import { useCallback, useRef, useState } from "react";
import { useOnlineStatus } from "./useOnlineStatus.js";
import { isNetworkError, getErrorMessage } from "../shared/utils/apiError.js";

export function useNetworkAwareSubmit(
  submitFn,
  { fallbackMessage, onSuccess, onError } = {},
) {
  const isOnline = useOnlineStatus();
  const [error, setError] = useState(null);
  const [frozen, setFrozen] = useState(false);
  const lastValuesRef = useRef();
  const hasSubmittedRef = useRef(false);

  const submit = useCallback(
    async (values) => {
      hasSubmittedRef.current = true;
      lastValuesRef.current = values;
      setError(null);

      try {
        const result = await submitFn(values);
        setFrozen(false);
        onSuccess?.(result);
        return { ok: true, data: result };
      } catch (err) {
        setError(getErrorMessage(err, fallbackMessage));
        setFrozen(isNetworkError(err));
        onError?.(err);
        return { ok: false, error: err };
      }
    },
    [submitFn, fallbackMessage, onSuccess, onError],
  );

  const retry = useCallback(() => {
    if (!hasSubmittedRef.current) return;
    return submit(lastValuesRef.current);
  }, [submit]);

  return { submit, retry, frozen: frozen || !isOnline, error };
}
