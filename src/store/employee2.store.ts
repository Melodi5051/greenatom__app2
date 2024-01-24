import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import LocalStorage from "../helpers/localstorage2.helper";
import { notificator } from "./notify.store";
import { IEmployee, INewEmployee, IQueryAllEmployees } from "../types/employerTypes";

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

  constData: IEmployee[] = [] as IEmployee[];

  constTableAlias = {
    tableTitle: "Сотрудники",

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
    "role.name": "Наименование роли",

    pagePosition: "Страница",
    pageSize: "Количество на странице",
  }

  /**
   * Удаляет сотрудника о его ID
   * 
   * @param data Данные формы из таблицы
   */
  async remove(data: { id: string | number }) {
    const response = await axios.delete(
      process.env.REACT_APP_BACKEND_ORIGIN + `/api/employees/${data.id}`,
      {
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${LocalStorage.get("at")}`
        },
      }
    );

    return response.status
  }

  /**
   * Создает нового сотрудника
   * 
   * @param data Данные нового сотрудника
   */
  async create(data: INewEmployee | {[key: string]: any}) {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_ORIGIN + `/api/auth/signup`,
      data,
      {
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${LocalStorage.get("at")}`
        },
      }
    );

    return response.status
  }

  /**
   * Изменяет информацию о сотруднике
   * 
   * @param data Новые данные для patch запроса
   */
  async edit(data: IEmployee | {[key: string]: any}) {
    const response = await axios.patch(
      process.env.REACT_APP_BACKEND_ORIGIN + `/api/employees/${data.id}`,
      data,
      {
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${LocalStorage.get("at")}`
        },
      }
    );

    return response.status;
  }

  /**
   * Возвращает информацию обо всех сотрудниках
   * @returns Объект, содержащий всех сотрудников и информацию для пагинации
   */
  async getAll(queryParameters: IQueryAllEmployees | {[key: string]: any}) {
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

      runInAction(() => {
        this.constData = response.data.content;
      })
      return JSON.parse(JSON.stringify(response.data.content));
    } catch (error) {
      notificator.push({ children: `Не удалось обновить данные. Проверьте вход в аккаунт`, type: "error" });
      return {};
    }
  }
}

export const employee = new Employee();