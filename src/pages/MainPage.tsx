import React from "react";
import styles from "../styles/mainpage.module.scss";
import { authentificator } from "../store/auth2.store";
import { classnames } from "../helpers/main.helper";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import Loader from "../components/Loader/Loader";
import { ROUTES_BY_ROLE } from "../router/router";

interface IPropsMainPage {

}

const MainPage: React.FC<IPropsMainPage> = (props) => {
  return <>
    <div className={classnames(styles.taL, styles.section)}>
      <h1>Добрый день, {authentificator.constUserData.firstname} {authentificator.constUserData.patronymic}!</h1>
      <p>За последнее время не произошло никаких изменений</p>
    </div>

    {/* 
      по аналогии как в 1С
      
      ниже будут идти фреймы с перечнем предлагаемых действий
      на основе последних операций. Фреймы с предлагаемыми действиями
      будут отрисовываться в зависимости роли текущего пользователя

      в фреймах будут предложения выполнить какие нибудь действия, а
      также будут отображаться краткие списки, отчеты, маленькие 
      выдержки из базы и тд.
     */}

    <div className={classnames(styles.taL, styles.section)}>
      <div>
        <h2>Обратите внимание</h2>
        <p>Возможно в этих действиях требуется ваше внимание</p>
      </div>
    </div>

    <div className={classnames(styles.taL, styles.section)}>
      <div>
        <h2>Быстрые действия</h2>
        <p>Здесь вы можете получить доступ к быстрым действиям и открыть необходимый раздел приложения</p>
      </div>

      <div className={classnames(styles.containerCard)}>
        {authentificator.gotUserData()
          ? ROUTES_BY_ROLE[`${authentificator.constUserData.role.name}`].map((obj: any, index: number) => {
            return (<Link key={index} to={obj.route} className={classnames(styles.noa)}>
              <div className={classnames(styles.actionCard, styles.taL)}>
                <h5>{obj.name}</h5>
                <p className={classnames(styles.textOverflow, styles.secondaryText)}>{obj.description}</p>
              </div>
            </Link>)
          })
          : <Loader />
        }
      </div>
    </div>

    {
      authentificator.constUserData.role.name === "ROLE_ADMIN"
    }
  </>

};

export default MainPage;
