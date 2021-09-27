import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Reducer } from "../reducer/reducer";

export const AppContext = createContext();
export const Dispatch = createContext();

const getState = () => {
  if (typeof window !== "undefined") {
    return (
      JSON.parse(window?.localStorage?.getItem("USERINFO")) || {
        auth: {
          isAuth: false,
          isAdmin: false,
          isSeller: false,
        },
        token: "",
        user: { id: "", email: "", firstName: "" },
        error: {
          isError: false,
          msg: "SOMETHING WENT WRONG",
        },
      }
    );
  }
  return {
    auth: {
      isAuth: false,
      isAdmin: false,
      isSeller: false,
    },
    token: "",
    user: { id: "", email: "", firstName: "" },
    error: {
      isError: false,
      msg: "SOMETHING WENT WRONG",
    },
  };
};

const initState = getState();

const appProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initState);

  useEffect(() => {
    window.localStorage.setItem("USERINFO", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = state.token;
  }, [state]);

  return (
    <AppContext.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </AppContext.Provider>
  );
};

export default appProvider;
