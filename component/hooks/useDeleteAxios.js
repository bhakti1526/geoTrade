import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Dispatch } from "../context/app.context";

const useDeleteAxios = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useContext(Dispatch);

  const deleteData = async (url) => {
    setIsLoading(true);
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
        dispatch({ type: "SET-ERROR", msg: err?.response?.data?.msg });
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, response, error, deleteData };
};

export default useDeleteAxios;
