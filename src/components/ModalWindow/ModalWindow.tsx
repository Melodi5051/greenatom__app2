import React, { ReactNode } from 'react';
import styles from './ModalWindow.module.scss';
import { JsxAttribute } from 'typescript';

interface ModalWindowProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ active, setActive, children }) => {
    return (
        <div className={`${styles.modal} ${active ? styles.active : ''}`} onClick={() => setActive(false)}>
            <div className={`${styles.modalContent} ${active ? styles.active : ''}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;