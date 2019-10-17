import { useState, useEffect } from 'react';

export const useDataApi = (request) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await request();
        if (!didCancel) {
          setData(result.data);
        }
      } catch (error) {
        if (!didCancel) {
          setIsError(true);
        }
      }
      setIsLoading(false);
    };
    fetchData();

    return () => {
      didCancel = true;
    };
  }, [request]);
  return { data, isLoading, isError };
};
