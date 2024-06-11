import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLES } from "../constants/roles";

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.signIn);
  return userInfo && userInfo.role === ROLES.ADMIN ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
