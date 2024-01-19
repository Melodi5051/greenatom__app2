import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../store/auth.store";
import { observer } from "mobx-react-lite";
import { useAuth } from "../hooks/useAuth";
import {
  setCurrentPathToLocalStorage,
  getCurrentPathToLocalStorage,
  getTokenFromLocalStorage,
} from "../helpers/localstorage.helper";
import { getMeHelper } from "../helpers/main.helper";
import { resreshTokenHelper } from "../helpers/auth.helper";
import { getALLEmployeeHelper } from "../helpers/employee.helper";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (authStore.isAuth) {
      setCurrentPathToLocalStorage(location.pathname);
    }
  }, [location.pathname]);
  useEffect(() => {
    const lastPath = getCurrentPathToLocalStorage();
    if (lastPath) {
      navigate(lastPath, { replace: true });
    }
  }, [navigate]);
  useEffect(() => {
    const refreshAuthToken = () => {
      const refreshToken = getTokenFromLocalStorage("refreshToken");
      if (refreshToken) {
        try {
          resreshTokenHelper(refreshToken);
          authStore.setIsAuth(true);
        } catch (error) {
          authStore.setIsAuth(false);
        }
      } else {
        authStore.setIsAuth(false);
        setLoading(false);
      }
    };
    refreshAuthToken();
  }, []);

  useEffect(() => {
    getALLEmployeeHelper();
    getMeHelper();
  }, [loading]);
  return (
    <div>
      {authStore.isAuth ? children : <Navigate replace to="/auth" />}
    </div>
  );
};

export default observer(ProtectedRouter);
