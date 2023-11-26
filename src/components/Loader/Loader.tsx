import React from "react";
import styles from "./Loader.module.scss";

interface IPropsLoader {
  sizeDependsOnPage?: boolean;
}

/**
 * Аниматор загрузки
 * @param param0 Принимает пропс `sizeDependsOnPage`. Если он `true` - размер Loader будет равен `10vw`. Если `false` - фиксированный размер
 */
const Loader: React.FC<IPropsLoader> = ({ sizeDependsOnPage = false }) => {
  const cls = `${styles.loader} ${sizeDependsOnPage ? styles.sizeDependsOnPage : styles.defaultSize}`
  return <span className={cls} />
}


export default Loader;