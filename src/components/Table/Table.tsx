import React, { useEffect, useState } from "react";
import style from "./Table.module.scss";
import { observer } from "mobx-react-lite";
import { EmployeeKeys, IInfoEmployee } from "../../pages/Employee";
import { EmployeeRole } from "../../types/employerTypes";
import TableItem from "../TableItem/TableItem";

interface IPropsTable {
  dataTable: IInfoEmployee[] | null;
  keys: string[];
}

const Table: React.FC<IPropsTable> = ({ dataTable, keys }) => {
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
          <TableItem {...el} key={index} />
        ))}
      </div>
    </div>
  );
};

export default observer(Table);
