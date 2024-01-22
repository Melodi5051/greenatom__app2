import { getMe } from "../API/axios.main";
import { userStore } from "../store/user.store";
import { IEmployee } from "../types/employerTypes";

export const getMeHelper = (): void => {
  getMe().then((dataUser: IEmployee) => {
    userStore.setUser(dataUser);
    if (dataUser) {
      userStore.setRole(dataUser.role)
    }
  });
};

export const checkPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  } else {
    return "Неверный формат номера";
  }
  return phoneNumber;
};


export const classnames = (...args: string[]): string => {
  return args.join(" ");
}

type AnyObject = Record<string, any>;

/**
 * Устанавливает значение ключа по переданному пути. Если такого путя нет - создает вложенные друг в друга объекты с указанными ключами-названиями
 * @param obj Оригинальный объект
 * @param path Путь к создаваемому свойству `key1.key2.key3`
 * @param value Значение
 * @returns Измененный объект
 */
export function createFieldsByPath(obj: AnyObject, path: string, value: any): AnyObject {
  const keys = path.split('.');
  const lastKey = keys.pop() as string;

  let currentObj = obj;
  keys.forEach((key) => {
    if (!currentObj[key]) {
      currentObj[key] = {};
    }
    currentObj = currentObj[key];
  });

  currentObj[lastKey] = value;

  return obj;
}


export function objFromMobx(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}