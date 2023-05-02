import React from "react";
import Cookies from "js-cookie";
import Login from "../Login";
import { useSelector } from "react-redux";

export default function PrivateRouter({ children }) {
  const token = useSelector((state) => state.token);
  if (!token) {
    return <Login />;
  }
  return children;
}
