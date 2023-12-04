import { observer } from "mobx-react-lite";

import styles from "./Main.module.scss";
const Main = () => {
  return <main className={styles.main}>MAIN</main>;
};

export default observer(Main);
