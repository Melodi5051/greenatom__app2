import { makeAutoObservable } from "mobx";
import Notify, { IPropsNotify } from "../components/Notify/Notify";

class Notificator {
  notifystack: IPropsNotify[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Добавляет уведомление в стек
   * @param param0 React children и тип уведомления (`"info" | "warning" | "error" | "positive" | "grey"`)
   */
  push({ children, type }: IPropsNotify) {
    this.notifystack.unshift({ children, type, uid: Date.now() })
    if (this.notifystack.length >= 10) this.pop();
  }

  /**
   * Удаляет последнее уведомление
   */
  pop() {
    const lastNotify = this.notifystack.pop();
  }

  /**
   * Удалить конкретное уведомление по его ID
   * @param uid Уникальный идентификатор уведомления
   */
  remove(uid: number) {
    this.notifystack = [...this.notifystack.filter((notify) => notify.uid !== uid)];
  }
}

export const notificator = new Notificator();