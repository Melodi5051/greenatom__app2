import axios from "axios";
import { mainStore } from "../store/main.store";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { departmentStore } from "../store/department.store";
import { notificator } from "../store/notify.store";

export const getAllDepartments = async (): Promise<any> => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_ORIGIN + "/api/department/",
      {
        params: {
          page: departmentStore.currentPage,
          limit: 5,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage("token")}`,
        },
      }
    );
    departmentStore.setCurrentPage(response.data.totalPages);
    return response.data.content;
  } catch (error) {
    notificator.push({children: `${error}`, type: "error"});
    console.log(error);
  }
};
