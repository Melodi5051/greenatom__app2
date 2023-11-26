import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../store/auth.store";
import { observer } from "mobx-react-lite";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Сохраняем текущий путь в localStorage перед выгрузкой страницы
    localStorage.setItem("lastPath", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Восстанавливаем последний сохраненный путь из localStorage при загрузке страницы
    const lastPath = localStorage.getItem("lastPath");
    if (lastPath) {
      navigate(lastPath, { replace: true });
    }
  }, [navigate]);

  return (
    <div>{authStore.isAuth ? children : <Navigate replace to="/login" />}</div>
  );
};

export default observer(ProtectedRouter);
