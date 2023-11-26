import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import styles from "./Main.module.scss";
import { getMeHelper } from "../../helpers/main.helper";
import Loader from "../Loader/Loader";
const Main = () => {
  useEffect(() => {
    getMeHelper();
  }, []);
  return <main className={styles.main}>
    MAIN
    <Loader sizeDependsOnPage/>
    <Loader />
    </main>;
};

export default observer(Main);
