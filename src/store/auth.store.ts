import { makeAutoObservable } from "mobx";

class Auth__Store {
  constructor() {
    makeAutoObservable(this);
  }
  isAuth = false;

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }
}

export const authStore = new Auth__Store();
