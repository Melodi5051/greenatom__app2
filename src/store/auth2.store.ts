import axios, { Axios, AxiosError, AxiosStatic } from "axios";
import { makeAutoObservable } from "mobx";
import { IAuthForm, ITokenData, ITokensData } from "../types/auth2Types";
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
   * `complete`, если пользователь авторизован
   */
  varAuthStatus: "not" | "pending" | "complete" = "not";

  /**
   * Объект-ответ от сервера с данными залогиненного пользователя
   */
  varTokenData: ITokensData = new Object();

  /**
   * Данные текущего пользователя
   */
  constUserData = new Object();

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
    return parseJwt(LocalStorage.get("at") || "");
  }

  /**
   * Обновляет токены в MobX и в localStorage
   * @param responseData Объект, содерщащий access и refresh Токены
   */
  _updateTokens(responseData: ITokensData) {
    if (responseData?.accessToken) {
      LocalStorage.set("at", responseData?.accessToken)
    }
    if (responseData?.refreshToken) LocalStorage.set("rf", responseData?.refreshToken);
    this.varAuthStatus = "complete";
    this.varTokenData = { ...responseData };
    console.log("Токены обновлены")
  }

  isAuth(): boolean {
    return (Date.now() < this._tokenData().exp)
  }

  /**
   * Вход в сервис и сохранение accessToken и refreshToken
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
      notificator.push({ children: `${error}`, type: "error" });
      this.varAuthStatus = "not";
      return 1;
    }
  }

  /**
   * Получает accessToken с помощью существующего refreshToken, который берется из localStorage.
   */
  async getAccessToken() {
    this.varAuthStatus = "pending";
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
      this.varAuthStatus = "not";
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
      return {};
    }
  }

  /**
   * Выход из текущего аккаунта
   * 
   * Так как на бэкенде нет специального метода для прекращения сессии - делаем это очисткой localStorage и хранилища MobX
   */
  signout() {
    notificator.push({ children: `Вы вышли из аккаунта ${this.constCurrentUserId}` });
    LocalStorage.clear();
    this.varAuthStatus = "not";
    this.varTokenData = "";
    this.constCurrentUserId = 0;
    this.constUserData = {};
  }

}


/**
 * Новый класс для работы с аутентификацией. Логин, регистрация, иная обработка - все будет здесь, без лишних хелперов и axios.* файлов.
 */
export const authentificator = new Authentificator();