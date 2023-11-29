import axios from "axios"
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper"
import { IEmployee } from "../types/employerTypes";

const employeeApi = "http://45.130.43.231:8080/api/employees/";

const axiosConfig = () => ({
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage("token")}`,
    },
});

export const getEmployeeById = async (id: number): Promise<IEmployee | undefined> => {
    try {
        const response = await axios.get(`${employeeApi}${id}`, axiosConfig());
        return response.data;
    } catch (error) {
        console.log("Ошибка при получении данных пользователя", error);
        throw error;
    }
};

export const deleteEmployeeById = async (id: number): Promise<IEmployee | undefined> => {
    try {
        const response = await axios.delete(`${employeeApi}${id}`, axiosConfig());
        return response.data;
    } catch (error) {
        console.error("Ошибка при удалении сотрудника:", error);
        throw error;
    }
};

export const patchEmployeeById = async (id: number): Promise<IEmployee | undefined> => {
    try {
        const response = await axios.patch(`${employeeApi}${id}`, axiosConfig());
        return response.data;
    } catch (error) {
        console.log("Ошибка при изменении работника", error);
        throw error;
    }
};