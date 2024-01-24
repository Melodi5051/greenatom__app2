import React, { useEffect, useState } from "react";
import { IMyTableMOBX } from "../MyTable/MyTable";
import { Table } from "react-bootstrap";
import Select from "../Select/Select";
import Input, { EyeInput } from "../Input/Input";
import { observer } from "mobx-react-lite";
import { isEmpty } from "lodash";
import { createFieldsByPath, objFromMobx } from "../../helpers/main.helper";
import Button from "../Button/Button";
import styles from "./AutoGenForm.module.scss";
import { notificator } from "../../store/notify.store";
import { modalmobx } from "../../store/modal.store";

/**
 * 
 */
type ITableMobxFormAction = "create" | "edit" | "remove"
export type ITableFormAction = "create" | "edit" | "remove" | "filter" | "properties" | "help"

interface IPropsAutoGenForm {
  mobx: IMyTableMOBX
  action: ITableFormAction
}

interface IPropsFormButtons {
  mobx: IMyTableMOBX
  type: "writeclose" | "okclose"
}


const DEFAULT_ALIASES = {
  create: "Создать запись",
  edit: "Изменить запись",
  remove: "Удалить запись",
  filter: "Фильтрация данных",
  properties: "Свойства таблицы",
  help: "Справка",
}


const submitForm = (e: React.FormEvent<HTMLFormElement>, mobx: IMyTableMOBX, action: ITableFormAction) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const obj: { [key: string]: any } = { ...(Object.fromEntries(formData.entries()) as unknown) as object };

  var requestBody = {};

  Object.keys(obj).forEach((fieldName: string, index: number) => {

    var data;
    // получение корректных данных на случай, если передается селектор
    if (mobx.constTableAlias[fieldName].inputType === "selector" && mobx.constTableAlias[fieldName].props && mobx.constTableAlias[fieldName]?.props?.options)
      // @ts-ignore
      data = mobx.constTableAlias[fieldName]?.props?.options()[Number(obj[fieldName])].name;
    else
      data = obj[fieldName]


    if (!isEmpty(data))
      requestBody = createFieldsByPath(requestBody, fieldName, data);
  })
  
  console.log(requestBody);

  mobx[action as ITableMobxFormAction](requestBody as any)
  .then((resp: number) => {
    console.log(resp);
    // mobx.getAll({  })
    notificator.push({children: "Изменена таблица", type: "positive"})
  })
  .catch((resp: number) => {
    console.log(resp)
    notificator.push({children: "Таблица не была изменена. Проверьте введенные данные", type: "error"})
  })

}



const FormButtons: React.FC<IPropsFormButtons> = (props) => {
  if (props.type === "okclose")
    return <div className={styles.formButtons}>
      <Button type="submit" viewtype="v1">
        Ок
      </Button>
      <Button viewtype="v2" onClick={() => modalmobx.disable()}>
        Закрыть
      </Button>
    </div>
  else
    return <div className={styles.formButtons}>
      <Button type="submit" viewtype="v2">
        Записать и закрыть
      </Button>
      <Button type="submit" viewtype="v2">
        Записать
      </Button>
      <Button viewtype="v3" onClick={() => modalmobx.disable()}>
        Закрыть
      </Button>
    </div>
}



const AutoGenForm: React.FC<IPropsAutoGenForm> = (props) => {

  function isValidField(aliasName: string) {
    return !tableAlias[aliasName].notInForm
      &&
      (
        isEmpty(tableAlias[aliasName].formTag)
          ? ['create', 'edit']
          : tableAlias[aliasName].formTag
      )?.includes(props.action)
  }

  useEffect(() => {
  }, [props.mobx.constData])

  const tableAlias = props.mobx.constTableAlias;

  return (
    <div>
      <h5>({props.mobx.constTableTitle}) {DEFAULT_ALIASES[props.action]}</h5>
      <div>
        <form
          onSubmit={(e) => submitForm(e, props.mobx, props.action)}
        >
          <Table borderless>
            <tbody>
              {
                Object.keys(tableAlias).map((aliasName: string, index: number) => {
                  return <tr key={index}>
                    {
                      isValidField(aliasName)
                        ? <td>
                          {tableAlias[aliasName].title}
                        </td>
                        : ''
                    }

                    {
                      isValidField(aliasName)
                        ? <td key={index * 100}>
                          {
                            tableAlias[aliasName].inputType === "selector"
                              ? <Select name={`${aliasName}`} id={aliasName} {...tableAlias[aliasName].props} options={tableAlias[aliasName].props && tableAlias[aliasName].props?.options()} />
                              : tableAlias[aliasName].inputType === "password"
                                ? <EyeInput name={`${aliasName}`} id={aliasName} />
                                : <Input name={`${aliasName}`} id={aliasName} type={tableAlias[aliasName].inputType} />
                          }
                        </td>
                        : ''
                    }
                  </tr>
                })
              }
            </tbody>
          </Table>
          <FormButtons mobx={props.mobx} type="writeclose" />
        </form>
      </div>
    </div>
  )
};

export default observer(AutoGenForm);
