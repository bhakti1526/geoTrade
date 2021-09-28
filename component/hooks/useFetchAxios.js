import { useEffect, useState } from "react";
import axios from "axios";

const useFetchAxios = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const getData = async () => {
    if (typeof window !== "undefined") {
      try {
        const { token } = JSON.parse(window.localStorage.getItem("USERINFO"));
        axios.defaults.headers.common["Authorization"] = token;
      } catch {
        axios.defaults.headers.common["Authorization"] = "";
      }
    }

    setIsLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
      .then((res) => {
        console.log(res.data.data);
        setResponse(res.data.data);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [url]);

  return { isLoading, response, error, getData };
};

export default useFetchAxios;
