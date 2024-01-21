import { observer } from "mobx-react-lite";

import styles from "./Main.module.scss";
import { authentificator } from "../../store/auth2.store";
const Main = () => {
  return <main className={styles.main}>
    {
      authentificator.isAuth() 
      ? <h1>Добрый день, {authentificator.constUserData.firstname}!</h1>
      : <p>Вы не авторизованы</p>
    }
  </main>;
};

export default observer(Main);
