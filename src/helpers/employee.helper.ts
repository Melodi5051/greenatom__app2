import { IDataRegisterEmployee } from "../types/userTypes";
import { createEmployee } from "../API/axios.employee";

export const createEmployeeHelper = (dataUser: IDataRegisterEmployee): void => {
    if (dataUser.firstname.length && dataUser.surname.length && dataUser.patronymic.length
        && dataUser.jobPosition.length && dataUser.salary && typeof dataUser.salary === 'number'
        && dataUser.email.length && dataUser.phoneNumber.length
        && dataUser.password && dataUser.repeatPassword && (dataUser.repeatPassword === dataUser.password)
        && dataUser.role && Object.keys(dataUser.role).length > 0
        && dataUser.address) {
        createEmployee(dataUser)
            .then((response) => {
                // Обработка успешного ответа
                console.log("Success:", response);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    console.log("ERROR");
};