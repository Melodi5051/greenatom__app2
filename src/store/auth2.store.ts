import axios, { } from "axios";
import { makeAutoObservable } from "mobx";
import { IAuthForm, ITokenData, ITokensData } from "../types/auth2Types";
import { notificator } from "./notify.store";
import LocalStorage from "../helpers/localstorage2.helper";
import { IEmployee, UserRole } from "../types/employerTypes";

/**
 * Заголовки, используемые в запросах к API для текущего стора
 */
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

/**
 * Возвращает распарсенный токен. Помогает извлечь id из него
 * @param token Токен
 * @returns Распарсенный токен
 */
function parseJwt(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(base64);
};


/**
 * Новый класс для работы с аутентификацией. Логин, регистрация, иная обработка - все будет здесь, без лишних хелперов и axios.* файлов.
 */
class Authentificator {
  constructor() {
    makeAutoObservable(this);
  }
  // поля

  /**
   * Объект-ответ от сервера с данными залогиненного пользователя
   */
  varTokenData: ITokensData = new Object();

  /**
   * Данные текущего пользователя
   */
  constUserData: IEmployee = {} as IEmployee;

  /**
   * username текущего пользователя
   */
  constCurrentUserId: number = -1;

  // методы
  /**
   * Возвращает данные из токена в localStorage
   * @returns Данные из токена
   */
  _tokenData(): ITokenData {
    if (LocalStorage.get("at")) return parseJwt(`${LocalStorage.get("at")}`)
    else return {} as ITokenData

  }

  /**
   * Обновляет токены в MobX и в localStorage
   * @param responseData Объект, содерщащий access и refresh Токены
   */
  _updateTokens(responseData: ITokensData) {
    if (responseData?.accessToken) {
      LocalStorage.set("at", responseData?.accessToken)
    }
    if (responseData?.refreshToken) LocalStorage.set("rt", responseData?.refreshToken);
    this.varTokenData = { ...responseData };
    console.log("Токены обновлены")
  }

  isAuth(): boolean {
    console.log(this._tokenData())
    console.log("Exp at", this._tokenData().exp, new Date(this._tokenData().exp))
    console.log("Exp at * 1000", this._tokenData().exp, new Date(this._tokenData().exp * 1000))
    console.log("Now", Date.now(), new Date(Date.now()))
    return (Date.now() < (this._tokenData().exp * 1000)) // умножаем, чтобы превратить дату окончания с 1970 на 2024 год
    // return ((Date.now() < (this._tokenData().exp * 1000)) && !!Object.keys(this.constUserData).length) // умножаем, чтобы превратить дату окончания с 1970 на 2024 год
  }

  /**
   * Вход в сервис и сохранение accessToken и refreshToken
   * @param formBody Объект, данные формы на странице `/auth`
   */
  async signin(formBody: IAuthForm) {
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
      notificator.push({ children: `${error}`, type: "error" });
      return 1;
    }
  }

  /**
   * Получает accessToken с помощью существующего refreshToken, который берется из localStorage.
   */
  async getAccessToken() {
    try {
      const body = { refreshToken: LocalStorage.get("rt") };

      const response = await axios.post(
        process.env.REACT_APP_BACKEND_ORIGIN + "/api/auth/access-token",
        body,
        {
          headers: DEFAULT_HEADERS
        }
      );

      this._updateTokens({ accessToken: response.data.accessToken });
      return 0;
    } catch (error) {
      notificator.push({ children: `${error}`, type: "error" });
      return 1;
    }
  }

  /**
   * Получает информацию о текущем залогиненном пользователе
   * 
   * Так как `/api/employees/me` больше не работает - делаем получение данных через декодирование JWT токена
   */
  async getMe() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_ORIGIN + `/api/employees/${this._tokenData().employee_id}`,
        {
          headers: {
            ...DEFAULT_HEADERS,
            Authorization: `Bearer ${LocalStorage.get("at")}`
          }
        }
      );

      this.constUserData = { ...response.data };
      return this.constUserData;
    } catch (error) {
      notificator.push({ children: `${error}`, type: "error" });
      throw new Error("Закончилась авторизация. Пожалуйста, войдите в аккаунт снова!");
      return {};
    }
  }

  /**
   * Обновляет авторизацию в сервисе. Получает обновленные jwt и refresh токены
   */
  async refresh() {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_ORIGIN + `/api/auth/refresh`,
        {
          refreshToken: LocalStorage.get("rt")
        },
        {
          headers: {
            ...DEFAULT_HEADERS,
            Authorization: `Bearer ${LocalStorage.get("at")}`
          }
        }
      );

      this._updateTokens(response.data);
      // this.constUserData = { ...response.data };
      // return this.constUserData;
      return 0;
    } catch (error) {
      notificator.push({ children: `${error}`, type: "error" });
      return 1;
    }
  }

  /**
   * Выход из текущего аккаунта
   * 
   * Так как на бэкенде нет специального метода для прекращения сессии - делаем это очисткой localStorage и хранилища MobX
   */
  signout() {
    notificator.push({ children: `Вы вышли из аккаунта ${this.constUserData.username}` });
    LocalStorage.clear();
    this.varTokenData = "";
    this.constCurrentUserId = 0;
    this.constUserData = {} as IEmployee;
  }

}


/**
 * Новый класс для работы с аутентификацией. Логин, регистрация, иная обработка - все будет здесь, без лишних хелперов и axios.* файлов.
 */
export const authentificator = new Authentificator();