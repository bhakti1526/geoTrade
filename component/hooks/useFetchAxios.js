import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Dispatch } from "../context/app.context";

const useFetchAxios = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useContext(Dispatch);

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
      .catch((err) => {
        setError(err);
        dispatch({ type: "SET-ERROR", msg: err?.response?.data?.msg });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    if (!url.includes("undefined")) {
      getData();
    }
  }, [url]);

  return { isLoading, response, error, getData };
};

export default useFetchAxios;
