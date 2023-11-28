import React from 'react';
import style from '../styles/errorpage.module.scss'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

const ErrorPage = () => {

    const error = useRouteError()

    return (
        isRouteErrorResponse(error) ? (
            <div className={style.errorPage}>
                <div className={style.errorStatusContent}>
                    <h2 className={style.errorStatus}>{`${error.status} :(`}</h2>
                </div>
                <h4 className={style.errorPageText}>{error.statusText || 'Что-то пошло не так!'}</h4>
                <Link className={style.btnBack} to='/'>назад</Link>
            </div>
        ) : (
            <div className={style.errorPage}>
                <div className={style.errorStatusContent}>
                    <h2 className={style.errorStatus}>{error instanceof Error ? `${error.message} :(` : 'Неизвестная ошибка'}</h2>
                </div>
                <h4 className={style.errorPageText}>{'Что-то пошло не так!'}</h4>
                <Link className={style.btnBack} to='/'>назад</Link>
            </div>
        )
    );
}

export default ErrorPage;