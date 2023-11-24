import { makeAutoObservable } from "mobx";

class Main__Store {
  constructor() {
    makeAutoObservable(this);
  }
}

export const mainStore = new Main__Store();
