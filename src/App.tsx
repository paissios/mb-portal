import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Dashboard />} path="/" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<LoginPage />} path="/login" />
      </Route>
    </Routes>
  );
}

export default App;
