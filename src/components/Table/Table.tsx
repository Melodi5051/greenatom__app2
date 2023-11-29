import React, { useEffect, useState } from "react";
import style from "./Table.module.scss";
import { IDepartment } from "../../types/departmentTypes";
import { observer } from "mobx-react-lite";
import { IEmployee } from "../../types/employerTypes";
import { EmployeeKeys, IInfoEmployee } from "../../pages/Employee";

interface IPropsTable {
  dataTable: IInfoEmployee[] | null;
  keys: string[];
}

const Table: React.FC<IPropsTable> = ({ dataTable, keys }) => {
  console.log(keys);
  return (
    <div className={style.table}>
      <div className={style.thead}>
        <div className={style.tr}>
          {keys.map((el: string, index) => (
            <div className={style.td} key={index}>
              {EmployeeKeys[el as keyof typeof EmployeeKeys]}
            </div>
          ))}
        </div>
      </div>
      <div className={style.tbody}>
        {dataTable?.map((el: IInfoEmployee, index: number) => (
          <div className={style.tr} key={index}>
            <div className={style.td}>{el.fullname}</div>
            <div className={style.td}>{el.jobPosition}</div>
            <div className={style.td}>{el.salary}</div>
            <div className={style.td}>{el.mail}</div>
            <div className={style.td}>{el.phoneNumber}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Table);
