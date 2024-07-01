import { Outlet, Navigate } from "react-router-dom";
import { validateAuth } from "../helpers/validateAuth";

function PrivateRoutes() {
  const isValidToken = validateAuth();

  return isValidToken ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
