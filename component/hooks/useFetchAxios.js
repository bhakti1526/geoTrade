import { useEffect, useState } from "react";
import axios from "axios";

const useFetchAxios = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      console.log("sending request");
      await axios
        .get(`http://localhost:4000${url}`)
        .then((res) => {
          setResponse(res.data.data);
        })
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    };

    getData();
  }, [url]);

  return { isLoading, response, error };
};

export default useFetchAxios;
