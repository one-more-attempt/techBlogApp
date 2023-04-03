import { Outlet, Navigate } from "react-router-dom";
import { ROUTE_PATH } from "./routePathes";

export const ProtectedRoute = () => {
  const auth = true;
  return auth ? <Outlet /> : <Navigate to={ROUTE_PATH.SIGN_IN}></Navigate>;
};
