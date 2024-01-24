import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import style from "./../styles/layout.module.scss";
import { classnames } from "../helpers/main.helper";
import { NotifyStack } from "../components/Notify/Notify";
import Modal from "../components/Modal/Modal";
const Layout = () => {
  return (
    <>
      <NotifyStack />
      <Modal />
      <div className={classnames(style.layout)}>
        <Header />
        <div className={classnames(style.content, "m-2")}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
