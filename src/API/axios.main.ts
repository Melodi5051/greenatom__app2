import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { resreshTokenHelper } from "../helpers/auth.helper";
import { mainStore } from "../store/main.store";
import { userStore } from "../store/user.store";
import { authStore } from "../store/auth.store";

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
    if (error.response.status === 401) {
      authStore.setIsAuth(false);
    }
  }
};
