import axios from "axios";
import { mainStore } from "../store/main.store";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { departmentStore } from "../store/department.store";

export const getAllDepartments = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "http://5.35.83.142:8082/api/department/",
      {
        params: {
          page: departmentStore.currentPage,
          limit: 5,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
    );
    departmentStore.setCurrentPage(response.data.totalPages);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};
