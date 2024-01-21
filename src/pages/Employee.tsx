import React, { useEffect, useState } from "react";
import styles from "../styles/employeepage.module.scss";
import stylesIndex from "../index.module.scss";
import Table, { TableRow } from "../components/Table/Table";
import { classnames } from "../helpers/main.helper";
import { employee, flattenObject } from "../store/employee2.store";
import { IQueryAllEmployees } from "../types/employerTypes";
import Loader from "../components/Loader/Loader";

interface IPropsEmployee {

}

const Employee: React.FC<IPropsEmployee> = (props) => {
  const [pageSize, setPageSize] = useState(10);
  const [pagePosition, setPagePosition] = useState(0);

  const exampleData = [
    {
      "id": 7,
      "firstname": "superadmin",
      "surname": "superadmin",
      "patronymic": "superadmin",
      "jobPosition": "SUPER_ADMIN",
      "salary": 100000,
      "email": "superadmin@crm.ru",
      "phoneNumber": "895436848",
      "username": "Superadmin",
      "role": {
        "name": "ROLE_SUPER_ADMIN"
      },
      "address": "Moscow"
    },
    {
      "id": 8,
      "firstname": "technicalUser",
      "surname": "technicalUSer",
      "patronymic": "technicalUser",
      "jobPosition": "ROLE_CLIENT_INTERMEDIARY",
      "salary": 100000,
      "email": "techUser1@crm.ru",
      "phoneNumber": "895436848",
      "username": "technicalUser_t_t_1",
      "role": {
        "name": "ROLE_CLIENT_INTERMEDIARY"
      },
      "address": "Moscow"
    }
  ]

  useEffect(() => {
    // employee.getAll({ pagePosition: pagePosition, pageSize: pageSize } as IQueryAllEmployees)
  }, [])

  return (
    <div className={classnames(stylesIndex.taL)}>
      <h2>Сотрудники</h2>
      <Table data={exampleData.map(value => {
        // @ts-ignore
        delete value.role;
      }) as any || []} />
      {/* {
        Boolean(Object.keys(employee.constEmployeesData).length)
          ? <>
            <Table data={employee.constEmployeesData as any} />
          </>
          : <Loader />
      } */}

    </div>
  );
};

export default Employee;
