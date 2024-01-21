export enum UserRole {
  "ROLE_ADMIN" = "Админ",
  "ROLE_MANAGER" = "Менеджер",
  "ROLE_DIRECTOR" = "Директор",
  "ROLE_WAREHOUSE_WORKER" = "Работник склада",
  "ROLE_COURIER" = "Курьер",
}

export enum EmployeeRole {
  "MANAGER" = "Менеджер",
  "ADMIN" = "Админ",
  "SUPER_ADMIN" = "Супер админ",
  "WAREHOUSE_WORKER" = "Работник склада",
  "COURIER" = "Курьер",
  "ROLE_CLIENT_INTERMEDIARY" = "Клиент",
}

// синхронизировать с src/router/router.tsx
export type IRoles =
  "ROLE_ADMIN" |
  "ROLE_MANAGER" |
  // "ROLE_DIRECTOR" |
  "ROLE_WAREHOUSE_WORKER" |
  "ROLE_COURIER" |
  "ROLE_SUPER_ADMIN"


export interface IEmployee {
  id: number;
  firstname: string;
  surname: string;
  patronymic: string;
  jobPosition: string;
  salary: number;
  email: string;
  phoneNumber: string;
  username: string;
  role: {
    // name: UserRole;
    name: IRoles;
  };
  address: string;
}

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

export interface IQueryAllEmployees {
  pagePosition: number
  pageSize: number
  firstname: number
  surname: string
  patronymic: string
  address: string
  email: string
  phoneNumber: string
  salary: number
  username: string
  jobPosition: IRoles
  sortBy: string | "id"
  sortDirection: undefined | "ASC" | "DESC"
}