import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { toJS } from "mobx";
import { userStore } from "../store/user.store";
import { mainStore } from "../store/main.store";
import { observer } from "mobx-react-lite";
import style from "./../styles/layout.module.scss";
import { getAllDepartmentHepler } from "../helpers/department.helpre";
const Layout = () => {
  useEffect(() => {}, [mainStore.loading]);
  useEffect(() => {}, [userStore.user]);
  getAllDepartmentHepler();
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
