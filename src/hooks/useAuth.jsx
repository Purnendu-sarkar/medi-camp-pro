import React, { useContext } from "react";
import AuthContext from "../providers/AuthContext";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
