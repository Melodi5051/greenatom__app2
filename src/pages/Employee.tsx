import React, {  } from "react";
import stylesIndex from "../index.module.scss";
import styles from "./../styles/employeepage.module.scss";
import { classnames } from "../helpers/main.helper";
import { employee } from "../store/employee2.store";
import { observer } from "mobx-react-lite";
// import Table from 'react-bootstrap/Table';
import MyTable, { IMyTableMOBX } from "../components/MyTable/MyTable";
import { mytablepaginator } from "../store/table.store";

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
          pagePosition: mytablepaginator.page,
          pageSize: mytablepaginator.size,
        }} />

      </div>
    </>
  );
};

export default observer(Employee);
