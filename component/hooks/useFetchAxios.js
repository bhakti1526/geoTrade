import { useEffect, useState } from "react";
import axios from "axios";

const useFetchAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000${url}`)
      .then((res) => setResponse(res.data))
      .catch((err) => setError(err));
  }, [url]);

  return { isLoading, response, error };
};

export default useFetchAxios;
