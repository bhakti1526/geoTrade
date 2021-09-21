import React, { createContext, useEffect, useReducer } from "react";
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
        user: { email: "", firstName: "" },
      }
    );
  }
  return {
    auth: {
      isAuth: false,
      isAdmin: false,
      isSeller: false,
    },
    user: { email: "", firstName: "" },
  };
};

const initState = getState();

const appProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initState);

  useEffect(() => {
    window.localStorage.setItem("USERINFO", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </AppContext.Provider>
  );
};

export default appProvider;
