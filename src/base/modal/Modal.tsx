import React from "react";
import styles from "./modal.module.css";
import { clx } from "@/utlities/clx";
type ModalTypes = {
  isOpen: boolean;
  onClose: () => void;
} & React.PropsWithChildren;
const Modal: React.FC<ModalTypes> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className={clx("modal-overlay", styles.overlayStyle)}
      onClick={handleOutsideClick}
    >
      <div className={styles.modalStyle}>{children}</div>
    </div>
  );
};

export default Modal;
