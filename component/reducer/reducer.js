import axios from "axios";
import jwtDecode from "jwt-decode";

export const Reducer = (state, action) => {
  switch (action.type) {
    case "AUTH-ADMIN":
      axios.defaults.headers.common["Authorization"] =
        action.data.data.data.token;
      return {
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
      axios.defaults.headers.common["Authorization"] = action.data.data.token;
      const { isSeller } = jwtDecode(action.data.data.token);

      return {
        auth: {
          isAuth: true,
          isAdmin: false,
          isSeller: isSeller,
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
      return {
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

    default:
      return state;
  }
};
