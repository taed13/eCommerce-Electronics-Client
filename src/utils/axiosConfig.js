import axios from "axios";

// export const base_url = "http://localhost:5001/api/";
export const base_url = "https://e-commerce-electronics-server.vercel.app/api/";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const token = localStorage.getItem("token");

export const authMiddleware = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? token : getTokenFromLocalStorage.token
    }`,
    Accept: "application/json",
  },
};
