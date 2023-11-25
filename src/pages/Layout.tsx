import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { userStore } from "../store/user.store";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { toJS } from "mobx";
import Input, { EyeInput } from "../components/Input/Input";

const Layout = () => {
  useEffect(() => {
    console.log(toJS(userStore.user));
  }, [userStore.user]);

  return (
    <div>
      <Header />
      <h1>{userStore.user.username}</h1>
      <Outlet />
      <p>-</p>
      <Input placeholder="Пример текста"/>
      <p>-</p>
      <EyeInput placeholder="Пример текста" style={{width: '300px'}}/>
      <p>-</p>
      <Footer />
    </div>
  );
};

export default Layout;
