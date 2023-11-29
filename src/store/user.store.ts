import { makeAutoObservable } from "mobx";
import { IUser } from "../types/userTypes";
import { IEmployee, UserRole } from "../types/employerTypes";

class User__Store {
  user: IEmployee | null = null;
  userRole: string = "";
  constructor() {
    makeAutoObservable(this);
  }
  setUser(dataUser: IEmployee) {
    console.log(dataUser);
    this.user = dataUser;
  }
  setRole(roleUser: UserRole) {
    console.log(roleUser);
    this.userRole = roleUser;
  }
}

export const userStore = new User__Store();
