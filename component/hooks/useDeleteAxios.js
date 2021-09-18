import { useEffect, useState } from "react";
import axios from "axios";

const useDeleteAxios = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const deleteData = async (url) => {
    setIsLoading(true);
    await axios
      .delete(`http://localhost:4000${url}`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  return { isLoading, response, error, deleteData };
};

export default useDeleteAxios;
