import React, { useEffect, useState } from "react";
import { employeeStore } from "../store/employee.store";
import { IEmployee } from "../types/employerTypes";
import { observer } from "mobx-react-lite";
import Loader from "../components/Loader/Loader";
import style from "./../styles/department.module.scss";
import Table from "../components/Table/Table";
import { getALLEmployee } from "../API/axios.employer";
import { getALLEmployeeHelper } from "../helpers/employee.helper";
import { mainStore } from "../store/main.store";
import { authStore } from "../store/auth.store";
import { getEmployeeById } from "../API/axios.employeeById";

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

const checkPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  } else {
    return ("Неверный формат номера")
  }
  return phoneNumber;
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
        phoneNumber: checkPhoneNumber(phoneNumber),
      };
    }) || []
  );
};

const Employer = () => {
  const [infoEmployee, setinfoEmployee] = useState<any[]>([]);
  const [arrayKeys, setArrayKeys] = useState<(keyof typeof EmployeeKeys)[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setinfoEmployee(transformData(employeeStore.dataEmployees));
  }, [employeeStore.dataEmployees]);
  useEffect(() => {
    getALLEmployeeHelper();
  }, []);
  useEffect(() => {
    if (infoEmployee.length > 0) {
      setLoading(false);
      setArrayKeys(extractKeys(infoEmployee));
    }
  }, [infoEmployee, employeeStore.dataEmployees]);

  // гет работника по айди
  useEffect(() => {
    const fetchEmployeeById = async () => {
      const employeeId = 4; //поменять айдишник на существующий
      try {
        const employee = await getEmployeeById(employeeId);
        console.log(`Сотрудник с id = ${employeeId}:`, employee);
      } catch (error) {
        console.error("Ошибка при получении информации о сотруднике:", error);
      }
    };
    fetchEmployeeById();
  }, []);

  return (
    <div className={style.content}>
      <div>ШАПКА</div>
      {!arrayKeys.length || loading ? (
        <Loader />
      ) : (
        <Table dataTable={infoEmployee} keys={arrayKeys} />
      )}
      <div>Пагинация</div>
    </div>
  );
};

export default observer(Employer);
