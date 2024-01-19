/**
 * Отлавливает ошибки и выводит их в Notificator
 */
import { INotifyType } from "../components/Notify/Notify";
import { notificator } from "../store/notify.store";

/**
 * Показывает уведомление с текстом
 * @param text Текст уведомления
 */
function showError(children: string, type: INotifyType = "error") {
  return notificator.push({children, type})
}

/**
 * Выполняет функцию, которая может завершиться ошибкой. Ошибка перехватывается и выводится в красивый Notificator Stack.
 * 
 * @param callbackDefault Функция, выполняющаяся в блоке try
 * @param callbackDefaultArgs Необязательный. Аргументы вызова default функции
 * @param callbackError Необязательный. Функция, выполняющаяся в блоке catch. По умолчанию - выводится Notify об ошибке с текстом этой ошибки
 */
export default function exception<Type>(callbackDefault: Function, callbackDefaultArgs: any[] = [], callbackError: Function = showError): Type {
  try {
    if (callbackDefaultArgs.length) return callbackDefault(...callbackDefaultArgs);
    else return callbackDefault();
  } catch (error) {
    return callbackError(`${error}`);
  }
}