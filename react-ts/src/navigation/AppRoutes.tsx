import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";
import { AuthService } from "../services/AuthService.ts";
import { LocalStorageService } from "../services/LocalStorageService.ts";

export const AppRoutes = () => {
  const navigate = useNavigate();
  const authService = new AuthService();
  const localStorageService = new LocalStorageService()

  return (
    <Routes>
      <Route
        path="/"
        element={<Login navigate={navigate} authService={authService} localStorageService={localStorageService} />}
      />
      <Route path="/recipes" element={<Recipes />} />
    </Routes>
  );
};