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
import { getALLEmployerHelper } from "../helpers/employer.helper";
import { employerStore } from "../store/employer.store";
const Layout = () => {
  useEffect(() => {}, [mainStore.loading]);
  // getAllDepartmentHepler();
  getALLEmployerHelper();
  console.log(employerStore.dataEmployers);
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
