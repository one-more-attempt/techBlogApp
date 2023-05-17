import { Outlet, Navigate } from "react-router-dom";
import { localStorageService } from "../services/LSService";
import { ROUTE_PATH } from "./routePathes";

export const ProtectedRoute = () => {
  const token = localStorageService.getToken();

  return token ? <Outlet /> : <Navigate to={ROUTE_PATH.SIGN_IN}></Navigate>;
};
