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
import { notificator } from "../store/notify.store";
import { modalmobx } from "../store/modal.store";
import { authentificator } from "../store/auth2.store";
import { useNavigate } from "react-router-dom";

interface IPropsEmployee { }

const Employee: React.FC<IPropsEmployee> = (props) => {
  const [pageSize, setPageSize] = useState(20);
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
      {/* 
        всю эту таблицу с кнопками засунуть в отдельный компонент 

        1. передача функций в компонент через пропсы
        2. по двойному клику на ячейку открывается модалка, в которой можно изменить ее значение и отправляем новое значение на сервер
        3. если нет эндпоинта для изменения значения - выскакивает уведомление, что значение изменить нельзя
        4. Наименования кнопок как в 1С - "Записать" и "Записать и закрыть"
      */}
      {!!Object.keys(data).length ? (
        <>
          <Table data={data as any} refreshTable={refreshTable} context={{
            name: "Сотрудники",
            headerAlias: {
              id: "Идентификатор",
              firstname: "Имя",
              
            }
          }} />
        </>
      ) : (
        <Loader sizeDependsOnPage />
      )}
    </div>
  );
};

export default observer(Employee);
