import React from "react";
import styles from "./Modal.module.scss";
import { isEmpty } from "lodash";
import { classnames } from "../../helpers/main.helper";
import { modalmobx } from "../../store/modal.store";
import { observer } from "mobx-react-lite";
import { notificator } from "../../store/notify.store";

export interface IModal {
  /**
   * `true`, если надо закрывать окно после клика внутри него
   */
  closeAfterClick?: boolean
}

const Modal: React.FC<IModal> = ({ closeAfterClick = false }) => {
  return (
    <div className={modalmobx.activeStatus ? classnames(styles.modal, styles.active) : styles.modal} onClick={() => modalmobx.modalCloseable ? modalmobx.show(false) : notificator.push({children: "Эту операцию нельзя прервать. Следуйте инстукциям внутри окна!", type: "warning"})}>
      <div className={modalmobx.activeStatus ? classnames(styles.modal__content, styles.active) : styles.modal__content} onClick={(e: any) => closeAfterClick ? '' : e.stopPropagation()}>
        <div className={styles.modalBody}>
          {modalmobx.children}
        </div>
      </div>
    </div>
  )
};

export default observer(Modal);
