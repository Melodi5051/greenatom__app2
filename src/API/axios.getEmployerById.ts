import axios from "axios"
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper"
import { IEmployee } from "../types/employerTypes";

export const getEmployerById = async (id: number): Promise<IEmployee | undefined> => {
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
        const employerId: IEmployee = response.data;
        return employerId;
    } catch (error) {
        console.log(error);
        throw error;
    }
};