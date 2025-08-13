import { useSearchParams } from "react-router-dom";

export function useQueryParam(key, defaultValue = "") {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(key) ?? defaultValue;

  const setValue = (newValue) => {
    const params = new URLSearchParams(searchParams);
    if (newValue === null || newValue === undefined || newValue === "") {
      params.delete(key);
    } else {
      params.set(key, newValue);
    }

    setSearchParams(params);
  };

  return [value, setValue];
}
