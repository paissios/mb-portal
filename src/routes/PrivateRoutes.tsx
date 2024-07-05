import { Outlet, Navigate } from "react-router-dom";
import { validateAuth } from "../helpers/validateAuth";
import { Fragment } from "react/jsx-runtime";
import LayoutWrapper from "../components/Layout/LayoutWrapper/LayoutWrapper";

function PrivateRoutes() {
  const isValidToken = validateAuth();

  return isValidToken ? (
    <Fragment>
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    </Fragment>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
