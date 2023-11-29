import React, { useEffect, useState } from "react";
import { employeeStore } from "../store/employee.store";
import { IEmployee } from "../types/employerTypes";
import { observer } from "mobx-react-lite";
import Loader from "../components/Loader/Loader";
import style from "./../styles/department.module.scss";
import Table from "../components/Table/Table";

export enum EmployeeKeys {
  "fullname" = "ФИО",
  "jobPosition" = "Должность",
  "salary" = "Зарплата",
  "mail" = "Почта",
  "phoneNumber" = "Номер телефона",
}
export interface IInfoEmployee {
  fullname: string;
  jobPosition: string;
  salary: number;
  mail: string;
  phoneNumber: string;
}
const extractKeys = (dataTable: IInfoEmployee[] | null) => {
  if (dataTable && dataTable.length > 0) {
    return Object.keys(dataTable[0]) as (keyof typeof EmployeeKeys)[];
  }
  return [];
};

const transformData = (data: IEmployee[] | null) => {
  return (
    data?.map((item) => {
      const {
        firstname,
        surname,
        patronymic,
        jobPosition,
        salary,
        phoneNumber,
        email,
      } = item;
      return {
        fullname: `${firstname} ${surname} ${patronymic}`,
        jobPosition,
        salary,
        mail: email,
        phoneNumber,
      };
    }) || []
  );
};

const Employer = () => {
  const [infoEmployee, setinfoEmployee] = useState<any[]>([]);
  const [arrayKeys, setArrayKeys] = useState<(keyof typeof EmployeeKeys)[]>([]);
  useEffect(() => {
    setinfoEmployee(transformData(employeeStore.dataEmployees));
  }, []);
  useEffect(() => {
    if (infoEmployee.length > 0) {
      setArrayKeys(extractKeys(infoEmployee));
    }
  }, [infoEmployee]);
  return (
    <div className={style.content}>
      <div>ШАПКА</div>
      {!arrayKeys.length ? (
        <Loader />
      ) : (
        <Table dataTable={infoEmployee} keys={arrayKeys} />
      )}
      <div>Пагинация</div>
    </div>
  );
};

export default observer(Employer);
