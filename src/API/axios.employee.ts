import axios from "axios";
import { IDataRegisterEmployee } from "../types/userTypes";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

// API для Администратора по созданию работников.
export const createEmployee = async (dataUser: IDataRegisterEmployee): Promise<any> => {
  try {
    const response = await axios.post(
        "http://45.130.43.231:8080/api/auth/signup",
      dataUser,
      {
        headers: 
        { "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`, },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};