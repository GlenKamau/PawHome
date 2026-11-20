import { useCallback, useEffect, useState } from "react";

export function useFetch(url, initialValue = null) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (signal) => {
      if (!url) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`.trim() || "Failed to fetch data.");
        }
        const json = await response.json();
        if (!signal?.aborted) {
          setData(json);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        if (!signal?.aborted) {
          setError(err.message || "Something went wrong while fetching data.");
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [url]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, loading, error, refetch, setData };
}