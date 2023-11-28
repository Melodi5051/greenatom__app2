import { makeAutoObservable } from "mobx";
import { IUser } from "../types/userTypes";
import { UserRole } from "../types/employerTypes";

class User__Store {
  user: IUser | null = null;
  userRole: string = "";
  constructor() {
    makeAutoObservable(this);
  }
  setUser(dataUser: IUser) {
    this.user = dataUser;
  }
  setRole(roleUser: UserRole) {
    this.userRole = roleUser;
  }
}

export const userStore = new User__Store();
