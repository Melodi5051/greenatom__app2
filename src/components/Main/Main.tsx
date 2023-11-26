import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import styles from "./Main.module.scss";
import { getMeHelper } from "../../helpers/main.helper";
const Main = () => {
  useEffect(() => {
    getMeHelper();
  }, []);
  return <main className={styles.main}>MAIN</main>;
};

export default observer(Main);
