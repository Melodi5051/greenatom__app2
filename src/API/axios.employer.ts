import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { IDataRegisterEmployee } from "../types/userTypes";
import { IEmployee } from "../types/employerTypes";
import { employeeStore } from "../store/employee.store";
import { getNewJWTToken } from "./axios.auth";
import { resreshTokenHelper } from "../helpers/auth.helper";
import { getALLEmployeeHelper } from "../helpers/employee.helper";
const employeeApi = "http://45.130.43.231:8080/api/employees/";

const axiosConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getTokenFromLocalStorage("token")}`,
  },
});

export const createEmployee = async (
  dataUser: IDataRegisterEmployee
): Promise<any> => {
  try {
    const response = await axios.post(
      "http://45.130.43.231:8080/api/auth/signup",
      dataUser,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage("token")}`,
        },
      }
    );
    const { token } = response.data;
    return token;
  } catch (error) {
    return error;
  }
};

export const getALLEmployee = async (): Promise<any> => {
  console.log(1);
  try {
    const response = await axios.get(
      `http://45.130.43.231:8080/api/employees?pagePosition=${employeeStore.currentPage}&pageSize=${employeeStore.limit}&sortBy=id`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage("token")}`,
        },
      }
    );
    const { content, totalPages } = response.data;
    employeeStore.setMaxPage(totalPages);
    return content;
  } catch (error) {
    resreshTokenHelper(
      getTokenFromLocalStorage("refreshToken"),
      getALLEmployeeHelper
    );
  }
};

export const getEmployeeById = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`${employeeApi}${id}`, axiosConfig());
    return response.data;
  } catch (error) {
    console.log("Ошибка при получении данных пользователя", error);
    return error;
  }
};

export const deleteEmployeeById = async (id: number): Promise<any> => {
  try {
    const response = await axios.delete(`${employeeApi}${id}`, axiosConfig());
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении сотрудника:", error);
    return error;
  }
};

export const patchEmployeeById = async (id: number): Promise<any> => {
  try {
    const response = await axios.patch(`${employeeApi}${id}`, axiosConfig());
    return response.data;
  } catch (error) {
    console.log("Ошибка при изменении работника", error);
    return error;
  }
};
