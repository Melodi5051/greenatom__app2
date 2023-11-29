import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const getALLEmployee = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "http://45.130.43.231:8080/api/employees",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage("token")}`,
        },
      }
    );
    const { content } = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};
