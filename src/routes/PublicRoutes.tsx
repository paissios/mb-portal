import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { validateAuth } from "../feature/login/authSlice";

function PublicRoutes() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(validateAuth());
  }, [dispatch]);

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
