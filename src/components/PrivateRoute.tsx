import { Navigate, Outlet } from "react-router-dom";
import { getAuthHeader } from "../lib/api";

export default function PrivateRoute() {
  const isAuth = !!getAuthHeader();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
