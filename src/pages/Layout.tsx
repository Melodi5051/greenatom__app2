import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import style from "./../styles/layout.module.scss";
import { getMeHelper } from "../helpers/main.helper";
import { authStore } from "../store/auth.store";
import { resreshTokenHelper } from "../helpers/auth.helper";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { getALLEmployeeHelper } from "../helpers/employee.helper";
const Layout = () => {
  useEffect(() => {
    resreshTokenHelper(getTokenFromLocalStorage("refreshToken"));
    getALLEmployeeHelper();
    getMeHelper();
  }, [authStore.isAuth]);
  return (
    <div className={style.layout}>
      <Header />
      <div className={style.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
