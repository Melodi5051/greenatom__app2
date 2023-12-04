import React from "react";
import refreshSVG from "./../../assets/svg/ui-refresh.svg";
import Button from "../Button/Button";
import style from "./TableHeader.module.scss";
const TableHeader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <h1>Сотрудники</h1>
        <img src={refreshSVG} alt="" />
      </div>
      <Button viewtype="v2">НОВЫЙ СОТРУДНИК</Button>
    </div>
  );
};

export default TableHeader;
