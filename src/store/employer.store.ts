import { makeAutoObservable } from "mobx";
import { IEmployer } from "../types/employerTypes";

class Employer__Store {
  dataEmployers: IEmployer[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  setDataEmployers(data: IEmployer[]) {
    this.dataEmployers = data;
  }
}

export const employerStore = new Employer__Store();
