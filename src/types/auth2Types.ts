/**
 * Интерфейсы для работы с авторизацией
 */

/**
 * Ответ от сервера при логине
 */
export interface ITokenData extends Object {
    accessToken?: string
    refreshToken?: string
}

/**
 * Интерфейс для данных формы `/auth`
 */
export interface IAuthForm extends Object {
    username: string
    password: string
}