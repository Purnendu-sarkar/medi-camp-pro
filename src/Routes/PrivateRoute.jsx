import React, { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../providers/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/join-us" state={{ from: location }} replace></Navigate>;
};
export default PrivateRoute;
