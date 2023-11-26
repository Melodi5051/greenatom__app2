import React from "react";
import styles from "./Notify.module.scss";
import PngWhiteInfo from "../../assets/png/white-icons8-info-50.png";
import PngWhiteWarning from "../../assets/png/white-icons8-warning-50.png";
import PngWhiteError from "../../assets/png/white-icons8-error-50.png";

export interface IPropsNotify {
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "positive" | "grey";
}

const Notify: React.FC<IPropsNotify> = (props) => {
  
  const iconSelector = {
    info: {src: PngWhiteInfo, header: "Информация"},
    warning: {src: PngWhiteWarning, header: "Внимание"},
    error: {src: PngWhiteError, header: "Ошибка"},
    positive: {src: PngWhiteInfo, header: "Успешно"},
    grey: {src: PngWhiteInfo, header: "Информация"}
  }
  
  const notifyType = props.type || "info";
  const cl = `${styles.notify} ${props.type ? styles[props.type] : styles.info}`;
  return (
    <div
    className={cl}
    onClick={(e) => {
      e.stopPropagation();
    }}
    >
      <div className={styles.icon}>
        <img src={iconSelector[notifyType].src} alt="" />
      </div>
      <div className={styles.notifyBody}>
        <h5>{iconSelector[notifyType].header}</h5>
        <p>{props.children}</p>
      </div>
    </div>
  )
};


const NotifyStack: React.FC = () => {
  return (
    <div>
      
    </div>
  )
};

export { NotifyStack };
export default Notify;
