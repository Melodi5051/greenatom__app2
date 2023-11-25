import { getMe } from "../API/axios.main";
import { mainStore } from "../store/main.store";
import { userStore } from "../store/user.store";

export const getMeHelper = (): void => {
  getMe().then((response) => {
    userStore.setUser(response);
    mainStore.setLoading(false);
  });
};
