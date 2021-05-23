import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState<Array<any> | Object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok)
          setData(data)
        else {
          setHasError(true);
          setErrorMessage(data)
        }
        setLoading(false);
      } catch (err) {
        setHasError(true);
        setErrorMessage(err.message);
      }
    }
    fetchData();
  }, []);

  return { data, loading, hasError, errorMessage };

}

export default useFetch;