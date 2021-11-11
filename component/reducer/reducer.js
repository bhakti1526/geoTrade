import axios from "axios";
import jwtDecode from "jwt-decode";

export const Reducer = (state, action) => {
  switch (action.type) {
    case "AUTH-ADMIN":
      delete axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.common["Authorization"] =
        action.data.data.data.token;
      return {
        ...state,
        auth: {
          isAuth: true,
          isAdmin: true,
          isSeller: false,
        },
        token: action.data.data.data.token,
        user: {
          email: action.data.data.data.user.email,
        },
      };

    case "AUTH-USER":
      delete axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.common["Authorization"] = action.data.data.token;
      const { isSeller } = jwtDecode(action.data.data.token);

      return {
        ...state,
        auth: {
          isAuth: true,
          isAdmin: false,
          isSeller: isSeller,
          isBuyer: true,
        },
        token: action.data.data.token,
        user: {
          email: action.data.data.user.email,
        },
      };

    case "SET-SELLER":
      return {
        ...state,
        auth: { isAuth: true, isAdmin: false, isSeller: true },
      };

    case "SET-SELLER-FALSE":
      return {
        ...state,
        auth: { isAuth: true, isAdmin: false, isSeller: false },
      };

    case "LOG-OUT":
      delete axios.defaults.headers.common["Authorization"];
      return {
        ...state,
        auth: {
          isAuth: false,
          isAdmin: false,
          isSeller: false,
        },
        token: "",
        user: {
          id: "",
          email: "",
          firstName: "",
        },
      };

    case "SET-ERROR":
      return {
        ...state,
        error: {
          isError: true,
          msg: action.msg,
        },
      };

    case "REMOVE-ERROR":
      console.log("THIS IS RUNNING");
      return {
        ...state,
        error: {
          isError: false,
          msg: "",
        },
      };

    default:
      return state;
  }
};
