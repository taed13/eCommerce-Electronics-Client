import { Navigate, Route } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
  return getTokenFromLocalStorage?.token ? (
    <Navigate to="/" replace={true} />
  ) : (
    children
  );
};
