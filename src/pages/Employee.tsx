import React, { useEffect, useState } from "react";
import stylesIndex from "../index.module.scss";
import styles from "./../styles/employeepage.module.scss";
import { classnames } from "../helpers/main.helper";
import { employee, flattenObject } from "../store/employee2.store";
import { observer } from "mobx-react-lite";
// import Table from 'react-bootstrap/Table';
import { IEmployee, IQueryAllEmployees } from "../types/employerTypes";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { isEmpty, isObject } from "lodash";
import Loader from "../components/Loader/Loader";
import Spinner from 'react-bootstrap/Spinner';
import MyTable from "../components/MyTable/MyTable";

interface IPropsEmployee { }


const Employee: React.FC<IPropsEmployee> = (props) => {
  const [pageSize, setPageSize] = useState(20);
  const [pagePosition, setPagePosition] = useState(0);
  const [data, setData] = useState(employee.constData);

  const refreshTable = () => {
    employee.getAll({ pagePosition, pageSize } as IQueryAllEmployees);
  };

  useEffect(() => {
    refreshTable();
  }, []);

  useEffect(() => {
    setData(employee.constData);
  }, [employee.constData]);

  return (
    <>
      <div className={classnames(stylesIndex.taL, styles.m0)}>
        <h2>Сотрудники</h2>
        {/*
      всю эту таблицу с кнопками засунуть в отдельный компонент

      1. передача функций в компонент через пропсы
      2. по двойному клику на ячейку открывается модалка, в которой можно изменить ее значение и отправляем новое значение на сервер
      3. если нет эндпоинта для изменения значения - выскакивает уведомление, что значение изменить нельзя
      4. √ Наименования кнопок как в 1С - "Записать" и "Записать и закрыть"
    */}
        {!isEmpty(employee.constData) ? (
          <>
            <ButtonGroup aria-label="Basic example">
              <Button variant="light" size="sm">Создать</Button>
              <Button variant="light" size="sm">Изменить</Button>
              <Button variant="light" size="sm">Обновить</Button>
              <Button variant="light" size="sm">Справка</Button>
            </ButtonGroup>
            <MyTable mobx={employee} />
          </>
        ) : (
          <>
            <Spinner animation="border" />
            {/* <p>Возможно больше данных нет. Вы можете вернуться на страницу просмотра</p> */}
          </>
        )}
      </div>
    </>
  );
};

export default observer(Employee);
