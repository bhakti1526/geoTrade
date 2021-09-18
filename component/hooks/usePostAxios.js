import { useState } from "react";
import axios from "axios";

const usePostAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const postData = async (data) => {
    setIsLoading(true);
    await axios
      .post(`http://localhost:4000${url}`, data)
      .then((res) => setResponse(res.data.data))
      .finally(() => setIsLoading(false));
  };

  return { isLoading, response, postData };
};

export default usePostAxios;
