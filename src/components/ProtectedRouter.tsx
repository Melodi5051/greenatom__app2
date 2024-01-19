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
import { authentificator } from "../store/auth2.store";
import Loader from "./Loader/Loader";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   if (authStore.isAuth) {
  //     setCurrentPathToLocalStorage(location.pathname);
  //   }
  // }, [location.pathname]);
  // useEffect(() => {
  //   const lastPath = getCurrentPathToLocalStorage();
  //   if (lastPath) {
  //     navigate(lastPath, { replace: true });
  //   }
  // }, [navigate]);
  // useEffect(() => {
  //   const refreshAuthToken = () => {
  //     const refreshToken = getTokenFromLocalStorage("refreshToken");
  //     if (refreshToken) {
  //       try {
  //         resreshTokenHelper(refreshToken);
  //         authStore.setIsAuth(true);
  //       } catch (error) {
  //         authStore.setIsAuth(false);
  //       }
  //     } else {
  //       authStore.setIsAuth(false);
  //       setLoading(false);
  //     }
  //   };
    // refreshAuthToken();
  // }, []);

  // useEffect(() => {
  //   getALLEmployeeHelper();
  //   getMeHelper();
  // }, [loading]);

  useEffect(() => {
    authentificator.getAccessToken();
  }, [])

  return (
    <div>
      {
        authentificator.varAuthStatus === "complete"
        ? children
        : (authentificator.varAuthStatus === "pending")
          ? <Loader />
          : <Navigate replace to="/auth" />
      }
    </div>
    // <div>
    //   {authentificator.varAuthStatus ? children : <Navigate replace to="/auth" />}
    // </div>
  );
};

export default observer(ProtectedRouter);
