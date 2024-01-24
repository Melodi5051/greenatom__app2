import { observer } from "mobx-react-lite";

import styles from "./Main.module.scss";
import { authentificator } from "../../store/auth2.store";
import { Navigate } from "react-router-dom";
import MainPage from "../../pages/MainPage";
const Main = () => {
  return <main className={styles.main}>
    {
      authentificator.isAuth() && authentificator.gotUserData()
      ? <MainPage />
      : <Navigate replace to={"/auth"} /> // работает и без этой строчки
    }
  </main>;
};

export default observer(Main);
