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
        .get(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
        .then((res) => {
          console.log(res.data.data);
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
