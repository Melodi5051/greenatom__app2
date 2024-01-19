import React from "react";
import styles from "./Notify.module.scss";
import PngWhiteInfo from "../../assets/png/white-icons8-info-50.png";
import PngWhiteWarning from "../../assets/png/white-icons8-warning-50.png";
import PngWhiteError from "../../assets/png/white-icons8-error-50.png";
import { notificator } from "../../store/notify.store";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";

export type INotifyType = "info" | "warning" | "error" | "positive" | "grey";

export interface IPropsNotify {
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "positive" | "grey";
  uid?: number;
}
/**
 * Уведомление справа вверху экрана
 * 
 * Пропс `uid` заполняется автоматически датой создания уведомления
 * @param props `children` - дочерний элемент
 * @param props `type` - Тип уведомления с соответствующей иконкой и цветом (по умолчанию `info`)
 */
const Notify: React.FC<IPropsNotify> = ({children, type, uid = Date.now()}) => {
  
  const iconSelector = {
    info: {src: PngWhiteInfo, header: "Информация"},
    warning: {src: PngWhiteWarning, header: "Внимание"},
    error: {src: PngWhiteError, header: "Ошибка"},
    positive: {src: PngWhiteInfo, header: "Успешно"},
    grey: {src: PngWhiteInfo, header: "Информация"}
  }
  
  const notifyType = type || "info";
  const cl = `${styles.notify} ${type ? styles[type] : styles.info} ${styles.active}`;
  return (
    <div
    className={cl}
    onClick={(e) => {
      e.stopPropagation();
      notificator.remove(uid);
    }}
    >
      <div className={styles.icon}>
        <img src={iconSelector[notifyType].src} alt="" />
      </div>
      <div className={styles.notifyBody}>
        <h5>{iconSelector[notifyType].header}</h5>
        <p>{children}</p>
      </div>
    </div>
  )
};


const NotifyStack: React.FC = observer(() => {
  return (
    <div className={styles.notifyStackDiv}>
      {notificator.notifystack.length && notificator.notifystack.map((notify: IPropsNotify, index: number) => {
        return <Notify type={notify.type} key={index} uid={notify.uid}>
          {notify.children}
        </Notify>
      })}
    </div>
  )
});

export { NotifyStack };
export default Notify;
