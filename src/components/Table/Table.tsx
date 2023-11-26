import React, { useEffect, useState } from "react";
import style from "./Table.module.scss";
import { IDepartment } from "../../types/departmentTypes";
import { observer } from "mobx-react-lite";
import { DepartmentKeys } from "../../pages/Department";

interface IPropsTable {
  dataTable: IDepartment[] | null;
  keys: string[];
}

const Table: React.FC<IPropsTable> = ({ dataTable, keys }) => {
  return (
    <div className={style.table}>
      <div className={style.thead}>
        <div className={style.tr}>
          {keys.map((el: string, index) => (
            <div className={style.td} key={index}>
              {DepartmentKeys[el as keyof typeof DepartmentKeys]}
            </div>
          ))}
        </div>
      </div>
      <div className={style.tbody}>
        {dataTable?.map((el: IDepartment, index: number) => (
          <div className={style.tr} key={index}>
            <div className={style.td}>{el.id}</div>
            <div className={style.td}>{el.name}</div>
            <div className={style.td}>{el.amountOfEmployee}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Table);
