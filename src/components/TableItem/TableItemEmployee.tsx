import React from "react";
import { IInfoEmployee } from "../../pages/Employee";
import style from "../Table/Table.module.scss";
import { EmployeeRole } from "../../types/employerTypes";
import { checkPhoneNumber } from "../../helpers/main.helper";

const TableItemEmployee: React.FC<IInfoEmployee> = (props) => {
  return (
    <div>
      <div className={style.tr}>
        <div className={style.td}>{props.fullname}</div>
        <div className={style.td}>
          {EmployeeRole[props.jobPosition as keyof typeof EmployeeRole]}
        </div>
        <div className={style.td}>{props.salary}</div>
        <div className={style.td}>{props.mail}</div>
        <div className={style.td}>{checkPhoneNumber(props.phoneNumber)}</div>
      </div>
    </div>
  );
};

export default TableItemEmployee;
