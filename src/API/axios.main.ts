import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const getMe = async (): Promise<any> => {
  try {
    const response = await axios.get("http://5.35.83.142:8082/api/user/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
