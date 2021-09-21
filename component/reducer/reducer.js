import axios from "axios";

export const Reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "AUTH-ADMIN":
      axios.defaults.headers.common["Authorization"] = action.data.token;
      return {
        auth: {
          isAuth: true,
          isAdmin: true,
          isSeller: false,
        },
        user: {
          email: action.data.data.user.email,
          firstName: action.data.data.user.firstName,
        },
      };

    case "LOG-OUT":
      return {
        auth: {
          isAuth: false,
          isAdmin: false,
          isSeller: false,
        },
        user: {
          email: "",
          firstName: "",
        },
      };

    default:
      return state;
  }
};
