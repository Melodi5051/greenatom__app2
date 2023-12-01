import React, { useEffect, useState } from "react";
import { employeeStore } from "../store/employee.store";
import { IEmployee } from "../types/employerTypes";
import { observer } from "mobx-react-lite";
import Loader from "../components/Loader/Loader";
import style from "./../styles/department.module.scss";
import Table from "../components/Table/Table";
import { getALLEmployee } from "../API/axios.employer";
import {
  getALLEmployeeHelper,
  getEmployeeByIdHelper,
} from "../helpers/employee.helper";
import { mainStore } from "../store/main.store";
import { authStore } from "../store/auth.store";
import { checkPhoneNumber } from "../helpers/main.helper";
import Pagination from "../components/Pagination/Pagination";

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
        phoneNumber: phoneNumber,
      };
    }) || []
  );
};

const Employer = () => {
  const [infoEmployee, setinfoEmployee] = useState<any[]>([]);
  const [arrayKeys, setArrayKeys] = useState<(keyof typeof EmployeeKeys)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employeeStore.dataEmployees.length) {
      setinfoEmployee(transformData(employeeStore.dataEmployees));
    }
  }, [employeeStore.dataEmployees]);

  useEffect(() => {
    getALLEmployeeHelper();
  }, [employeeStore.currentPage]);

  useEffect(() => {
    if (infoEmployee.length > 0) {
      setLoading(false);
      setArrayKeys(extractKeys(infoEmployee));
    }
  }, [infoEmployee, employeeStore.dataEmployees]);

  // useEffect(() => {
  //   getEmployeeByIdHelper(3);
  // }, []);

  return (
    <div className={style.content}>
      <div>ШАПКА</div>
      {!arrayKeys.length || loading ? (
        <Loader />
      ) : (
        <>
          <Table dataTable={infoEmployee} keys={arrayKeys} />
          <Pagination maxPages={employeeStore.maxPage} />
        </>
      )}
    </div>
  );
};

export default observer(Employer);
