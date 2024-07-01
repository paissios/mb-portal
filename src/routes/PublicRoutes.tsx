import { Outlet, Navigate } from "react-router-dom";
import { validateAuth } from "../helpers/validateAuth";

function PublicRoutes() {
  const isValidToken = validateAuth();
  
  return isValidToken ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
