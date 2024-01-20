/**
 * Интерфейсы для работы с авторизацией
 */

/**
 * Ответ от сервера при логине
 */
export interface ITokensData extends Object {
    accessToken?: string // сохраняем в localStorage
    refreshToken?: string // сервер устанавливает в cookie ?
}

/**
 * Интерфейс для данных формы `/auth`
 */
export interface IAuthForm extends Object {
    username: string
    password: string
}

export interface IEmployee {
    description: string
    id: number
    firstname: string
    surname: string
    patronymic: string
    username: string
    jobPosition: string
    salary: number
    email: string
    phoneNumber: string
    address: string
    role: Object | Array<any>
}

export interface ITokenData {
    employee_id: number
    exp: number
    iat: number
    role: string
    sub: string
}