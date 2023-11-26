import { getAllDepartments } from "../API/axios.department";
import { departmentStore } from "../store/department.store";
import { mainStore } from "../store/main.store";
import { IDepartment } from "../types/departmentTypes";

export const getAllDepartmentHepler = (): any => {
  mainStore.setLoading(true);
  getAllDepartments().then((data: IDepartment[]) => {
    mainStore.setLoading(false);
    console.log(mainStore.loading);
    departmentStore.setDepartmentsData(data);
    console.log(departmentStore.departmentsData);
  });
};
