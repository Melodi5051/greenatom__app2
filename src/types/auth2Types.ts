/**
 * Интерфейсы для работы с авторизацией
 */

import { UserRole } from "./employerTypes";

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

export interface ITokenData {
    employee_id: number
    exp: number
    iat: number
    role: string
    sub: string
}