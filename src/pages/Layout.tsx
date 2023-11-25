import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { userStore } from "../store/user.store";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { toJS } from "mobx";

const Layout = () => {
  useEffect(() => {
    console.log(toJS(userStore.user));
  }, [userStore.user]);

  return (
    <div>
      <Header />
      <h1>{userStore.user.username}</h1>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
