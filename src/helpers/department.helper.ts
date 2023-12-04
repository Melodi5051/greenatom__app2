import { getAllDepartments } from "../API/axios.department";
import { departmentStore } from "../store/department.store";
import { mainStore } from "../store/main.store";
import { IDepartment } from "../types/departmentTypes";

export const getAllDepartmentHepler = (): void => {
  mainStore.setLoading(true);
  getAllDepartments().then((data: IDepartment[]) => {
    mainStore.setLoading(false);
    departmentStore.setDepartmentsData(data);
  });
};
