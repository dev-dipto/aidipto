import { useCallback, useEffect, useState } from 'react';

/**
 * State mirrored into localStorage so the assistant keeps context for the
 * session. Storage is per-browser and never leaves the device.
 */
export function useSessionState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage can be unavailable in private modes — the UI still works */
    }
  }, [key, value]);

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    setValue(initial);
  }, [key, initial]);

  return [value, setValue, clear] as const;
}
