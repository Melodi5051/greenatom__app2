import { makeAutoObservable } from "mobx";
import Notify, { IPropsNotify } from "../components/Notify/Notify";

class Notificator {
  notifystack: IPropsNotify[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  push({ children, type }: IPropsNotify) {
    this.notifystack.unshift({ children, type, uid: Date.now() })
    if (this.notifystack.length >= 10) this.pop();
  }

  pop() {
    const lastNotify = this.notifystack.pop();
  }

  remove(uid: number) {
    this.notifystack = [...this.notifystack.filter((notify) => notify.uid !== uid)];
  }
}

export const notificator = new Notificator();