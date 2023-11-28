import axios from "axios";
import { IDataLogin, IDataRegister } from "../types/userTypes";

export const authRegister = async (dataUser: IDataRegister): Promise<any> => {
  try {
    const response = await axios.post(
      "http://5.35.83.142:8082/api/registration",
      dataUser,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const { token } = response.data;
    return token;
  } catch (error) {
    return error;
  }
};
export const authLogin = async (dataUser: IDataLogin): Promise<any> => {
  try {
    const response = await axios.post(
      "http://79.174.80.230:8080/api/auth/signin",
      dataUser,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    return error;
  }
};
