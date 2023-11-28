import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const getALLEmployer = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "http://79.174.80.230:8080/api/employees",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
    );
    const { content } = response.data;
    return content;
  } catch (error) {
    console.log(error);
  }
};
