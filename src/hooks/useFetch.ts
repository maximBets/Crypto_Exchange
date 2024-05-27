import { useState, useEffect, useCallback } from "react";

const useFetch = (url: string | null) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setFetchError] = useState<null | Error>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    try {
      setFetchError(null);
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setFetchError(
        error instanceof Error ? error : new Error("Unknown error")
      );
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
};

export default useFetch;
