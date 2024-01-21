import React, { useEffect, useState } from "react";
import stylesIndex from "../index.module.scss";
import styles from "./../styles/employeepage.module.scss";
import Table from "../components/Table/Table";
import { classnames } from "../helpers/main.helper";
import { employee } from "../store/employee2.store";
import { IQueryAllEmployees } from "../types/employerTypes";
import Loader from "../components/Loader/Loader";
import Input, { InputSimple } from "../components/Input/Input";
import Button from "../components/Button/Button";
import { observer } from "mobx-react-lite";

interface IPropsEmployee {}

const Employee: React.FC<IPropsEmployee> = (props) => {
  const [pageSize, setPageSize] = useState(10);
  const [pagePosition, setPagePosition] = useState(0);
  const [data, setData] = useState(employee.constEmployeesData);

  const refreshTable = () => {
    employee.getAll({ pagePosition, pageSize } as IQueryAllEmployees);
  };

  useEffect(() => {
    refreshTable();
  }, []);

  useEffect(() => {
    setData(employee.constEmployeesData);
  }, [employee.constEmployeesData]);

  return (
    <div className={classnames(stylesIndex.taL, styles.m0)}>
      <h2>Сотрудники</h2>
      {!!Object.keys(data).length ? (
        <>
          <div style={{ backgroundColor: "#f1f1f1", marginTop: '25px', border: '1px solid #ddd' }}>
            <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }}>
              Изменить значение
            </Button>
            <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }}>
              Фильтрация
            </Button>
            <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }}>
              Сортировка
            </Button>
            <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }} onClick={refreshTable}>
              Обновить таблицу
            </Button>
            <Button viewtype="text" style={{ backgroundColor: "#f1f1f1" }}>
              Справка
            </Button>
          </div>
          <Table data={data as any} />
        </>
      ) : (
        <Loader sizeDependsOnPage />
      )}
    </div>
  );
};

export default observer(Employee);
