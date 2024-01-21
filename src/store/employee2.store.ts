import axios from "axios";
import { makeAutoObservable } from "mobx";
import LocalStorage from "../helpers/localstorage2.helper";
import { notificator } from "./notify.store";
import { IEmployee, IQueryAllEmployees } from "../types/employerTypes";

/**
 * Заголовки, используемые в запросах к API для текущего стора
 */
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

export function flattenObject(obj: object) {
  var result: object = {};

  Object.entries(obj).forEach(([key, val]) => {
    // if object (and not null!), merge it with the resulting object,
    // otherwise just copy the value
    if (val && typeof val === "object")
      Object.assign(result, val);
    else
      // @ts-ignore
      result[`${key}`] = val;
  });

  return result;
}



class Employee {
  constructor() {
    makeAutoObservable(this);
  }

  constEmployeesData: IEmployee[] = [] as IEmployee[];

  /**
   * Возвращает информацию обо всех сотрудниках
   * @returns Объект, содержащий всех сотрудников и информацию для пагинации
   */
  async getAll(queryParameters: IQueryAllEmployees) {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_ORIGIN + `/api/employees`,
        {
          headers: {
            ...DEFAULT_HEADERS,
            Authorization: `Bearer ${LocalStorage.get("at")}`
          },
          params: { ...queryParameters }
        }
      );

      this.constEmployeesData = JSON.parse(JSON.stringify(response.data)).content
      return JSON.parse(JSON.stringify(response.data)).content;
    } catch (error) {
      notificator.push({ children: `${error}`, type: "error" });
      return 1;
    }
  }
}

export const employee = new Employee();