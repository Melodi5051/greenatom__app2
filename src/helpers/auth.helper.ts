import { authLogin } from "../API/axios.auth";
import { authStore } from "../store/auth.store";
import { IDataLogin } from "../types/userTypes";
import { setTokenToLocalStorage } from "./localstorage.helper";

// Не имеет смысла без регистрации
// export const registerHepler = (dataNewUser: IDataRegister): void => {
  //TODO ПЕРЕПИСАТЬ УСЛОВИЕ
  // if (
  //   dataNewUser.username.length ||
  //   dataNewUser.password.length ||
  //   dataNewUser.password !== dataNewUser.confirmPassword ||
  //   dataNewUser.email.length
  // ) {
  //   authRegister(dataNewUser).then((token) => {
  //     if (token) {
  //       authStore.setIsAuth(true);
  //       setTokenToLocalStorage(token);
  //     }
  //   });
  //   return;
  // }
  // console.log("ERROR");
// };

export const loginHelper = (dataUser: IDataLogin): void => {
  //TODO ПЕРЕПИСАТЬ УСЛОВИЕ
  if (dataUser.username.length && dataUser.password.length) {
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
