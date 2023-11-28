import { makeAutoObservable } from "mobx";
import { IUser } from "../types/userTypes";
import { IEmployer, UserRole } from "../types/employerTypes";

class User__Store {
  user: IEmployer | null = null;
  userRole: string = "";
  constructor() {
    makeAutoObservable(this);
  }
  setUser(dataUser: IEmployer) {
    console.log(dataUser);
    this.user = dataUser;
  }
  setRole(roleUser: UserRole) {
    console.log(roleUser);
    this.userRole = roleUser;
  }
}

export const userStore = new User__Store();
