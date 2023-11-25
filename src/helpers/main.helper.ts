import { getMe } from "../API/axios.main";
import { userStore } from "../store/user.store";

export const getMeHelper = (): void => {
  userStore.setUser(getMe());
};
