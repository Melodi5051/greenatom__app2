import axios from "axios"
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper"
import { IEmployee } from "../types/employerTypes";

export const getEmployeeById = async (id: number): Promise<IEmployee | undefined> => {
    try {
        const response = await axios.get(
            `http://45.130.43.231:8080/api/employees/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getTokenFromLocalStorage("token")}`,
                },
            }
        );
        const employeeById: IEmployee = response.data;
        return employeeById;
    } catch (error) {
        console.log(error);
        throw error;
    }
};