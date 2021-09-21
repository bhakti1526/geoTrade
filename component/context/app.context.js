import React, { createContext, useReducer } from "react";
import { Reducer } from "../reducer/reducer";

export const AppContext = createContext();
export const Dispatch = createContext();

const initState = {
  auth: {
    isAuth: true,
    isAdmin: true,
    isSeller: true,
  },
};

const appProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initState);

  return (
    <AppContext.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </AppContext.Provider>
  );
};

export default appProvider;
