import React, { ChangeEvent, useEffect, useState } from "react";
import stylesIndex from "../index.module.scss";
import styles from "./../styles/employeepage.module.scss";
import Table from "../components/Table/Table";
import { classnames } from "../helpers/main.helper";
import { employee } from "../store/employee2.store";
import { IEmployee, INewEmployee, IQueryAllEmployees } from "../types/employerTypes";
import Loader from "../components/Loader/Loader";
import { observer } from "mobx-react-lite";
import { notificator } from "../store/notify.store";
import { ROUTES_BY_ROLE } from "../router/router";
import { find } from "lodash";

interface IPropsEmployee { }

/**
 * При вызове заполняет все найденные селекторы данными. Селекторы берутся из ключей самих данных
 * 
 * @param e Событие клика по селектору
 * @param data Значения, которые надо использовать
 */
const fillCurrentFormBySelectorValue = (e: ChangeEvent<HTMLInputElement>, data: any) => {
  // @ts-ignore
  const optionName: string = e.target?.options[Number(e.target.value)].innerText;
  const emplObj: IEmployee = find(Object.values(data), { id: Number(optionName.charAt(0)) }) as IEmployee;
  const emplValues = Object.values(emplObj as Object);
  const emplKeys = Object.keys(emplObj as Object);

  emplKeys.forEach((selectorPart: string) => {
    const element = document.querySelector(`#${selectorPart}`) as any
    if (element && `#${selectorPart}` !== `#${e.currentTarget.id}`)
      element.value = emplObj[selectorPart];
  })
}

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
        4. √ Наименования кнопок как в 1С - "Записать" и "Записать и закрыть"
      */}
      {!!Object.keys(data).length ? (
        <>
          <Table data={data as any} context={{
            title: "Сотрудники",
            refreshTable: refreshTable,
            headerAlias: {
              id: "ID",
              firstname: "Имя",
              surname: "Фамилия",
              patronymic: "Отчество",
              jobPosition: "Должность",
              salary: "З/П",
              email: "Эл. почта",
              phoneNumber: "Номер телефона",
              username: "Логин",
              role: "Право доступа",
              address: "Адрес",

              // подписи для форм управления таблицей
              password: "Пароль",
              repeatPassword: "Повторите пароль",
              "role.name": "Наименование роли"
            },
            actions: {
              add: {
                nessesaryFields: [
                  "firstname",
                  "surname",
                  "patronymic",
                  "jobPosition",
                  "salary",
                  "email",
                  "phoneNumber",
                  { title: "password", inputType: "password" },
                  { title: "repeatPassword", inputType: "password" },
                  "address",
                  {
                    title: "role.name", inputType: "select", props: {
                      options: Object.keys(ROUTES_BY_ROLE).map(v => { return { name: v } })
                    }
                  }
                ],
                writeCallback: async (form: INewEmployee) => {
                  console.log("employees.tsx", form)
                  // const response = await 
                }
              },
              edit: {
                nessesaryFields: [
                  {
                    title: "id", inputType: "select", props: {
                      // @ts-ignore
                      options: employee.constEmployeesData.map((empl) => { return { name: `${empl.id} (${empl.username} ${empl.role.name})` } }),
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => fillCurrentFormBySelectorValue(e, employee.constEmployeesData)
                    }
                  }
                ],
                optionalFields: [
                  "firstname",
                  "surname",
                  "patronymic",
                  "jobPosition",
                  "salary",
                  "email",
                  "phoneNumber",
                  // "password",
                  // "repeatPassword",
                  "address",
                  // "role.name"
                ],
                writeCallback: async () => notificator.push({ children: "Данные обновлены" })
              }
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
