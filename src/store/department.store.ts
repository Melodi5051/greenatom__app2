import { makeAutoObservable } from "mobx";
import { IDepartment } from "../types/departmentTypes";

class Department__Store {
  departmentsData: IDepartment[] | null = null;
  currentPage: number = 0;
  limit: number = 10;
  constructor() {
    makeAutoObservable(this);
  }
  setCurrentPage(page: number) {
    this.currentPage = page;
  }
  setDepartmentsData(departmentsData: IDepartment[]) {
    this.departmentsData = departmentsData;
  }
}

export const departmentStore = new Department__Store();
