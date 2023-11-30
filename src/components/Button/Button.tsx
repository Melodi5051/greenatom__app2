import React, { useState } from "react";
import styles from "./Button.module.scss";

interface IPropsButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  viewtype?: "v1" | "v2" | "text" | "admin" | "manager" | "courier"
}

/**
 * Кнопка
 * 
 * В качестве children может принимать два варианта 
 * иконок - когда курсор вне кнопки и когда курсор над кнопкой
 * 
 * Пример:
 * ```
 * <Button viewtype="v2">
    Текст кнопки
    <img src={SvgUserIcon}/>
    <img src={SvgWhiteUserIcon}/>
  </Button>
 * ```
 * 
 * @param props Принимают необязательный параметр `viewtype`
 * @returns 
 */
const Button: React.FC<IPropsButton> = (props) => {
  const btnClassName = `${styles.button} ${styles[props?.viewtype || "v1"]} ${styles.withIcon}`;

  const childrens = React.Children.toArray(props.children);


  const [showSecondIcon, setShowSecondIcon] = useState(false);

  // два типа подгружаемых иконок.
  // если дочерний элемент 1 - просто рисуем кнопку
  if (childrens.length <= 2) {
    return (
      <button
        className={btnClassName}
        {...props}
      >
        {props.children}
      </button>
    );
  } else {
    // если вторым ребенком передаем иконку
    // она должна быть в черном и белом исполнении
    return <button
      className={btnClassName}
      onMouseMove={() => setShowSecondIcon(true)}
      onMouseLeave={() => setShowSecondIcon(false)}
      {...props}
    >
      {childrens[0]}
      {showSecondIcon
        ? childrens[2]
        : childrens[1]
      }
    </button>
  }

};

export default Button;
