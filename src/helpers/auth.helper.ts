import { useNavigate } from "react-router-dom";
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
  authLogin(dataUser).then((token) => {
    if (token) {
      authStore.setIsAuth(true);
      setTokenToLocalStorage(token);
    }
  });
};
