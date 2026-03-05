import { FC, ReactNode, useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/shared";
import { IModalProps, IModalHeaderProps, IModalContentProps, IModalFooterProps } from "../lib";
import style from "./Modal.module.css";

const ModalPortal: FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted && typeof document !== "undefined" 
    ? createPortal(children, document.body) 
    : null;
};

const ModalHeader: FC<IModalHeaderProps> = ({ children, onClose, showCloseButton = true }) => (
  <div className={style.header}>
    <h2 className={style.title}>{children}</h2>
    {showCloseButton && onClose && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        aria-label="Закрыть"
      >
        &times;
      </Button>
    )}
  </div>
);

const ModalContent: FC<IModalContentProps> = ({ children }) => (
  <div className={style.content}>{children}</div>
);

const ModalFooter: FC<IModalFooterProps> = ({ children }) => (
  <div className={style.footer}>{children}</div>
);

const ModalCore: FC<IModalProps> = ({ isOpen, onClose, children, theme = "light" }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    modalRef.current?.focus();
    
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div 
      className={`${style.overlay} ${theme === "dark" ? style["overlay--dark"] : ""}`} 
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div 
        ref={modalRef}
        className={`${style.modal} ${theme === "dark" ? style["modal--dark"] : ""}`} 
        role="dialog" 
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
};

const Modal = Object.assign(
  ({ isOpen, onClose, children, theme }: IModalProps) => (
    <ModalPortal>
      <ModalCore isOpen={isOpen} onClose={onClose} theme={theme}>
        {children}
      </ModalCore>
    </ModalPortal>
  ),
  {
    Header: ModalHeader,
    Content: ModalContent,
    Footer: ModalFooter,
  }
);

export default Modal;