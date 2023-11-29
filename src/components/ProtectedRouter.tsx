import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../store/auth.store";
import { observer } from "mobx-react-lite";
import { useAuth } from "../hooks/useAuth";
import {
  setCurrentPathToLocalStorage,
  getCurrentPathToLocalStorage,
  getTokenFromLocalStorage,
} from "../helpers/localstorage.helper";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authStore.isAuth) {
      setCurrentPathToLocalStorage(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Восстанавливаем последний сохраненный путь из localStorage при загрузке страницы
    const lastPath = getCurrentPathToLocalStorage();
    if (lastPath) {
      navigate(lastPath, { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      {authStore.isAuth ||
      getTokenFromLocalStorage("token") ||
      getTokenFromLocalStorage("refreshToken") ? (
        children
      ) : (
        <Navigate replace to="/авторизация" />
      )}
    </div>
  );
};

export default observer(ProtectedRouter);
