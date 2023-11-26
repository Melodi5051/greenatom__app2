import { makeAutoObservable } from "mobx";

import { IUser } from "../types/types";

class User__Store {
  user: IUser | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  setUser(dataUser: any) {
    this.user = dataUser;
  }
}

export const userStore = new User__Store();
