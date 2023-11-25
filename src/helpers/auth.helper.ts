import { authLogin, authRegister } from "../API/axios.auth";
import { getMe } from "../API/axios.main";
import { authStore } from "../store/auth.store";
import { mainStore } from "../store/main.store";
import { setTokenToLocalStorage } from "./localstorage.helper";

export const registerHepler = (dataNewUser: any): void => {
  authRegister(dataNewUser).then((token) => {
    if (token) {
      authStore.setIsAuth(true);
      setTokenToLocalStorage(token);
    }
  });
};
export const loginHelper = (dataUser: any): void => {
  authLogin(dataUser).then((token) => {
    if (token) {
      authStore.setIsAuth(true);
      setTokenToLocalStorage(token);
    }
  });
};
