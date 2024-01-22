import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import style from "./../styles/layout.module.scss";
import Loader from "../components/Loader/Loader";
import { getMeHelper } from "../helpers/main.helper";
import { NotifyStack } from "../components/Notify/Notify";
import Modal from "../components/Modal/Modal";
import { modalmobx } from "../store/modal.store";
const Layout = () => {
  return (
    <>
      <NotifyStack />
      <Modal />
      <div className={style.layout}>
        <Header />
        <div className={style.content}>
          <Outlet />
        </div>
        <Footer />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
