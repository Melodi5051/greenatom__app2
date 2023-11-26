import { authLogin, authRegister } from "../API/axios.auth";
import { authStore } from "../store/auth.store";
import { IDataLogin } from "../types/types";
import { setTokenToLocalStorage } from "./localstorage.helper";

export const registerHepler = (dataNewUser: any): void => {
  authRegister(dataNewUser).then((token) => {
    if (token) {
      authStore.setIsAuth(true);
      setTokenToLocalStorage(token);
    }
  });
};

export const loginHelper = (dataUser: IDataLogin): void => {
  //TODO ПЕРЕПИСАТЬ УСЛОВИЕ
  if (dataUser.username.length || dataUser.password.length) {
    authLogin(dataUser).then((token) => {
      if (token) {
        authStore.setIsAuth(true);
        setTokenToLocalStorage(token);
      }
    });
    return;
  }
  console.log("ERROR");
};