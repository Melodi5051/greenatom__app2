import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { authStore } from "../store/auth.store";
import { resreshTokenHelper } from "../helpers/auth.helper";
import { getMeHelper } from "../helpers/main.helper";

export const getMe = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "http://45.130.43.231:8080/api/employees/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage("token")}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    resreshTokenHelper(getTokenFromLocalStorage("refreshToken"), getMeHelper);
  }
};
