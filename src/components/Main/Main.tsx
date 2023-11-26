import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styles from "./Main.module.scss";
import { getMeHelper } from "../../helpers/main.helper";
import Checkbox from "../Checkbox/Checkbox";
const Main = () => {
  useEffect(() => {
    getMeHelper();
  }, []);
  return <main className={styles.main}>MAIN</main>;
};

export default observer(Main);
