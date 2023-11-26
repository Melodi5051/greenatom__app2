import { observer } from "mobx-react-lite";

import styles from "./Main.module.scss";
import { useEffect } from "react";
import { getMeHelper } from "../../helpers/main.helper";
import Notify from "../Notify/Notify";
import Button from "../Button/Button";
import { notificator } from "../../store/notify.store";
const Main = () => {
  return <main className={styles.main}>
    MAIN <br />
    <Button
      viewtype="v2"
      onClick={() => {
        notificator.push({
          children: `Текущее время ${new Date().toLocaleTimeString()}`,
          type: "info"
        })
      }}
    >
      Показать время
    </Button>
    </main>;
};

export default observer(Main);
