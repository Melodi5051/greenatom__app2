import React from 'react';
import style from '../styles/errorpage.module.scss'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {

    const error = useRouteError()

    const renderError = () => {
        if (isRouteErrorResponse(error) && error.status >= 400 && error.status <= 404) {
            return (<div className={style.errorPage}>
                <div className={style.errorStatusContent}>
                    <h2 className={style.errorStatus}>{`${error.status} :(`}</h2>
                </div>
                <h4 className={style.errorPageText}>{error.statusText || 'Что-то пошло не так!'}</h4>
                <Link className={style.btnBack} to='/'>Вернуться на главную</Link>
            </div>)
        }
    }

    return (
        <>
            {renderError()}
        </>
    );
}

export default ErrorPage;