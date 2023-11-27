import { observer } from "mobx-react-lite";

import styles from "./Main.module.scss";
import { useEffect } from "react";
import { getMeHelper } from "../../helpers/main.helper";
import Notify from "../Notify/Notify";
import Button from "../Button/Button";
import { notificator } from "../../store/notify.store";
const Main = () => {
  useEffect(() => {
    getMeHelper();
  }, []);
  return <main className={styles.main}>MAIN</main>;
};

export default observer(Main);
