import React, { useEffect, useState } from "react";
import stylesIndex from "../index.module.scss";
import styles from "./../styles/employeepage.module.scss";
import { classnames, objFromMobx } from "../helpers/main.helper";
import { employee, flattenObject } from "../store/employee2.store";
import { observer } from "mobx-react-lite";
// import Table from 'react-bootstrap/Table';
import { IEmployee, IQueryAllEmployees } from "../types/employerTypes";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { isEmpty, isObject } from "lodash";
import Loader from "../components/Loader/Loader";
import Spinner from 'react-bootstrap/Spinner';
import MyTable, { IMyTableMOBX } from "../components/MyTable/MyTable";

interface IPropsEmployee { }


const Employee: React.FC<IPropsEmployee> = (props) => {

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

        <MyTable mobx={employee as IMyTableMOBX} paginator={{
          pagePosition: 0,
          pageSize: 40,
        }} />

      </div>
    </>
  );
};

export default observer(Employee);
