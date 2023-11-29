import { makeAutoObservable } from "mobx";
import { IEmployee } from "../types/employerTypes";

class Employee__Store {
  dataEmployees: IEmployee[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  setDataEmployees(data: IEmployee[]) {
    this.dataEmployees = data;
  }
}

export const employeeStore = new Employee__Store();
