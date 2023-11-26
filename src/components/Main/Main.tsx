import { observer } from "mobx-react-lite";

import styles from "./Main.module.scss";
import { useEffect } from "react";
import { getMeHelper } from "../../helpers/main.helper";
const Main = () => {
  useEffect(() => {
    getMeHelper();
  }, []);
  return <main className={styles.main}>MAIN</main>;
};

export default observer(Main);
