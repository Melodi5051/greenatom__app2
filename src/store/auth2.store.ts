import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IAuthForm, ITokenData } from "../types/auth2Types";
import exception from "../helpers/exceptor.helper";
import { notificator } from "./notify.store";
import LocalStorage from "../helpers/localstorage2.helper";

/**
 * Заголовки, используемые в запросах к API для текущего стора
 */
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

/**
 * Новый класс для работы с аутентификацией. Логин, регистрация, иная обработка - все будет здесь, без лишних хелперов и axios.* файлов.
 */
class Authentificator {
  constructor() {
    makeAutoObservable(this);
  }
  // поля

  /**
   * `true`, если пользователь авторизован
   */
  varAuthStatus: "not" | "pending" | "complete" = "pending";

  /**
   * Объект-ответ от сервера с данными залогиненного пользователя
   * 
   * Устанавливается методом signin
   */
  varTokenData: ITokenData = new Object();

  /**
   * Данные текущего пользователя
   */
  constUserData = new Object();

  // методы

  /**
   * Обновляет токены в MobX и в localStorage
   * @param responseData Объект, содерщащий access и refresh Токены
   */
  _updateTokens(responseData: ITokenData) {
    if (responseData?.accessToken) LocalStorage.set("at", responseData?.accessToken);
    if (responseData?.refreshToken) LocalStorage.set("rf", responseData?.refreshToken || "");
    this.varAuthStatus = "complete";
    this.varTokenData = { ...responseData };
  }

  /**
   * 
   * @param formBody Объект, данные формы на странице `/auth`
   */
  async signin(formBody: IAuthForm) {
    this.varAuthStatus = "pending";
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_ORIGIN + "/api/auth/signin",
        formBody,
        {
          headers: DEFAULT_HEADERS
        }
      )

      if (response.status === 200) {
        this._updateTokens(response.data);
        return 0;
      } else throw new axios.AxiosError("Аутентификация не произошла, проверьте логин и пароль или обратитесь к администратору")

    } catch (error) {
      notificator.push({children: `${error}`, type: "error"});
      return 1;
    }
  }

  /**
   * Получает accessToken с помощью существующего refreshToken, который берется из localStorage.
   */
  async getAccessToken() {
    this.varAuthStatus = "pending";
    try {
      const body = {refreshToken: LocalStorage.get("rt")};
  
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_ORIGIN + "/api/auth/access-token",
        body,
        {
          headers: DEFAULT_HEADERS
        }
      );
  
      this._updateTokens({accessToken: response.data.accessToken});
      return 0;
    } catch (error) {
      notificator.push({children: `${error}`, type: "error"});
      return 1;
    }
  }

  
}


/**
 * Новый класс для работы с аутентификацией. Логин, регистрация, иная обработка - все будет здесь, без лишних хелперов и axios.* файлов.
 */
export const authentificator = new Authentificator();