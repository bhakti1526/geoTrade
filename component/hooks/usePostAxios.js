import { useState } from "react";
import axios from "axios";

const usePostAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    setIsLoading(true);

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data)
      .then((res) => setResponse(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  return { isLoading, response, postData };
};

export default usePostAxios;
