import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LayoutWrapper from "../components/Layout/LayoutWrapper/LayoutWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { validateAuth } from "../feature/login/authSlice";
import { Backdrop, CircularProgress } from "@mui/material";

function PrivateRoutes() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      dispatch(validateAuth());
      setIsLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <Backdrop
        component="div"
        open={true}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return isAuthenticated ? (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
