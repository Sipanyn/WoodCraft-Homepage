import React, { useEffect } from "react";
import styles from "./modal.module.css";
import { clx } from "@/utlities/clx";

type ModalTypes = {
  isOpen: boolean;
  onClose: () => void;
} & React.PropsWithChildren;

const Modal: React.FC<ModalTypes> = ({ isOpen, onClose, children }) => {
  // ✅ Lock body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

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
