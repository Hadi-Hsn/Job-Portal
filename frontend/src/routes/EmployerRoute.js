import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLES } from "../constants/roles";

const EmployerRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.signIn);
  return userInfo && userInfo.role === ROLES.EMPLOYER ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default EmployerRoute;
