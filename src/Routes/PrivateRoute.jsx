import React from "react";
// import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";
// import AuthContext from "../providers/AuthContext";
import useAuth from "../hooks/useAuth";
import MedicalCrossSpinner from "../Page/Shared/MedicalCrossSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <MedicalCrossSpinner />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/join-us" state={{ from: location }} replace></Navigate>;
};
export default PrivateRoute;
