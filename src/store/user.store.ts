import { makeAutoObservable } from "mobx";
import { IEmployee, UserRole } from "../types/employerTypes";

class User__Store {
  user: IEmployee | null = null;
  userRole: string = "";
  routesByRole: any = {
    ROLE_ADMIN: {
      Сотрудники: "/employees",
      Продукты: "/orders",
    },
    ROLE_MANAGER: {
      Продукты: "/products",
      Заказы: "/orders",
      Корзина: "/cart",
    },
    // "ROLE_DIRECTOR": {
    //   'routeName': '/somepath',
    //   'routeName': '/somepath'
    // },
    ROLE_WAREHOUSE_WORKER: {
      Склад: "/warehouse",
    },
    ROLE_COURIER: {
      Доставка: "/доставка",
    },
  };

  constructor() {
    makeAutoObservable(this);
  }
  setUser(dataUser: IEmployee) {
    this.user = dataUser;
  }
  setRole(roleUser: UserRole | string) {
    console.log(roleUser);
    this.userRole = roleUser;
  }

  setRoutesByRole = (userRole: any) => {
    if (userRole !== undefined) {
      if (userRole in this.routesByRole) {
        return this.routesByRole[userRole];
      }
    }
    return;
  };
}

export const userStore = new User__Store();
