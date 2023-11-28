export enum UserRole {
  "ROLE_ADMIN" = "Админ",
  "MANAGER" = "Менеджер",
  "DIRECTOR" = "Директор",
  "WAREHOUSE_WORKER" = "Работник склада",
  "COURIER" = "Курьер",
}

export interface IEmployer {
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
