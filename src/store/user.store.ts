import { makeAutoObservable } from "mobx";

class User__Store {
  user: any = {};
  constructor() {
    makeAutoObservable(this);
  }
  setUser(dataUser: any) {
    console.log(dataUser);
    this.user = dataUser;
  }
}

export const userStore = new User__Store();
