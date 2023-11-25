import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { userStore } from "../store/user.store";
import { getMeHelper } from "../helpers/main.helper";
import { mainStore } from "../store/main.store";
import { observer } from "mobx-react-lite";
import Header from "../components/Header/Header";

const Layout = () => {
  useEffect(() => {
    // getMeHelper();
  }, []);
  useEffect(() => {}, [mainStore.loading]);
  useEffect(() => {}, [userStore.user]);
  return (
    <div>
      <Header />
      <Outlet />
      <footer>FOOTER</footer>
    </div>
  );
};

export default observer(Layout);
