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
    name: UserRole;
  };
  address: string;
}
