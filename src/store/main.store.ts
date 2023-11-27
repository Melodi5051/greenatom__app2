import { makeAutoObservable } from "mobx";

class Main__Store {
  token: string | null = null;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }
  setLoading(status: boolean) {
    this.loading = status;
  }

  setToken(token: string) {
    this.token = token;
  }
}

export const mainStore = new Main__Store();
