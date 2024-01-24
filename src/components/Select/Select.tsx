import React, { useState } from 'react';
import styles from './Select.module.scss';
import { observer } from 'mobx-react-lite';

interface ISelectOption extends React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement> {
    name: string
}

// type ISelectOption = string;


interface ISelect extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    options: ISelectOption[]
    innervalue?: string
}

const Select: React.FC<ISelect> = (props) => {
    const [innerValue, setInnerValue] = useState("");
    return <>
        <select className={styles.select} name={props.name} id={props.name} defaultValue={0} onChange={(e) => setInnerValue(props.options[Number(e.target.value)].name)} innervalue={innerValue} {...props}>
            {props.options && props.options.map((value: ISelectOption, index: number) => {
                return <option value={index} key={index}>{value.name}</option>
            })}
        </select>
    </>
}

export default observer(Select);