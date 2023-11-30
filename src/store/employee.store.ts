import { makeAutoObservable } from "mobx";
import { IEmployee } from "../types/employerTypes";

class Employee__Store {
  dataEmployees: IEmployee[] = [];
  dataEmployee: IEmployee | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setDataEmployee(data: IEmployee) {
    this.dataEmployee = data;
  }

  setDataEmployees(data: IEmployee[]) {
    this.dataEmployees = data;
  }
}

export const employeeStore = new Employee__Store();
