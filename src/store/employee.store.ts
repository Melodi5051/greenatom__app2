import { makeAutoObservable } from "mobx";
import { IEmployee } from "../types/employerTypes";

class Employee__Store {
  dataEmployees: IEmployee[] = [];
  dataEmployee: IEmployee | null = null;
  currentPage: number = 0;
  maxPage: number = 0;
  limit: number = 10;
  constructor() {
    makeAutoObservable(this);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setMaxPage(maxPage: number) {
    this.maxPage = maxPage;
  }
  setDataEmployee(data: IEmployee) {
    this.dataEmployee = data;
  }

  setDataEmployees(data: IEmployee[]) {
    this.dataEmployees = data;
  }
}

export const employeeStore = new Employee__Store();
