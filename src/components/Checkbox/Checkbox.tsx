import React from "react";
import styles from "./Checkbox.module.scss";

interface IPropsCheckbox extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
}

const Checkbox: React.FC<IPropsCheckbox> = (props) => {
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        name={props.name}
        id={props.name}
      />
      <label htmlFor={props.name}>
        {props.children}
      </label>
    </div>
  )
};

export default Checkbox;


