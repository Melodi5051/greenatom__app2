import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>HEADER</header>
      <Outlet />
      <footer>FOOTER</footer>
    </div>
  );
};

export default Layout;
