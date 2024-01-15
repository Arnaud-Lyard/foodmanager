import { useState, useCallback } from "react";
import Cookies from "js-cookie";

export default function useCookie(
  name: string,
  defaultValue: string
): [string | null, () => void] {
  const [value, setValue] = useState<string | null>(() => {
    const cookie = Cookies.get(name);
    if (cookie) return cookie;
    Cookies.set(name, defaultValue);
    return defaultValue;
  });

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(null);
  }, [name]);

  return [value, deleteCookie];
}
