import React from "react";
import { IInfoEmployee } from "../../pages/Employee";
import style from "../Table/Table.module.scss";
import { EmployeeRole } from "../../types/employerTypes";

interface TableItemProps {
  fullname: string;
  jobPosition: string;
  salary: number;
  mail: string;
  phoneNumber: string;
}

interface IPropsItem {}
const TableItem: React.FC<TableItemProps> = (props) => {
  return (
    <div>
      <div className={style.tr}>
        <div className={style.td}>{props.fullname}</div>
        <div className={style.td}>
          {EmployeeRole[props.jobPosition as keyof typeof EmployeeRole]}
        </div>
        <div className={style.td}>{props.salary}</div>
        <div className={style.td}>{props.mail}</div>
        <div className={style.td}>{props.phoneNumber}</div>
      </div>
    </div>
  );
};

export default TableItem;
