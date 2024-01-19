/**
 * Обработчик для localStorage
 */
export default class LocalStorage {
    /**
     * Установить значение по ключу
     * @param k Ключ
     * @param v Значение
     */
    static set(k: string, v: string): void {
        localStorage.setItem(k, v);
    }
    
    /**
     * Получить значение по ключу
     * @param k Ключ
     */
    static get(k: string): string | null {
        return localStorage.getItem(k);
    }

    /**
     * Удалить значение по ключу
     * @param k Ключ
     */
    static rm(k: string): void {
        localStorage.removeItem(k);
    }

    /**
     * Очистить хранилище
     */
    static clear(): void {
        localStorage.clear();
    }

    /**
     * Получить содержимое хранилища как объект
     * @returns Объект
     */
    static obj(): object {
        return {...localStorage};
    }
}