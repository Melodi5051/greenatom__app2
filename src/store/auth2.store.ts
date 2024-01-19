import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IAuthForm, ITokenData } from "../types/auth2Types";

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
  tokenData: ITokenData = new Object();

  // методы
  
  /**
   * 
   * @param formBody Объект, данные формы на странице `/auth`
   */
  signin(formBody: IAuthForm) {

  }
}