import React, { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import style from "./../styles/department.module.scss";
import { getAllDepartmentHepler } from "../helpers/department.helpre";
import { departmentStore } from "../store/department.store";
import { observer } from "mobx-react-lite";
import { mainStore } from "../store/main.store";
import Loader from "../components/Loader/Loader";
import { IDepartment } from "../types/departmentTypes";
import { getALLEmployerHelper } from "../helpers/employer.helper";
import { employerStore } from "../store/employer.store";

export enum DepartmentKeys {
  "id" = "Номер",
  "name" = "Название",
  "amountOfEmployee" = "Кол-во работников",
}
const extractKeys = (dataTable: IDepartment[] | null) => {
  if (dataTable && dataTable.length > 0) {
    return Object.keys(dataTable[0]) as (keyof typeof DepartmentKeys)[];
  }
  return [];
};

const Department = () => {
  const [arrayKeys, setArrayKeys] = useState<(keyof typeof DepartmentKeys)[]>(
    []
  );
  useEffect(() => {
    setArrayKeys(extractKeys(departmentStore.departmentsData));
  }, [departmentStore.departmentsData]);
  return (
    <div className={style.content}>
      <div>ШАПКА</div>
      {mainStore.loading ? (
        <Loader />
      ) : (
        <Table dataTable={departmentStore.departmentsData} keys={arrayKeys} />
      )}
      <div>Пагинация</div>
    </div>
  );
};

export default observer(Department);
