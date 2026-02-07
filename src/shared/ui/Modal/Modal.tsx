import { FC, ReactNode, useEffect } from "react";
import style from "./Modal.module.css";
import { Button } from "@/shared";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  theme?: "light" | "dark";
}

interface IModalHeaderProps {
  children: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

interface IModalContentProps {
  children: ReactNode;
}

interface IModalFooterProps {
  children: ReactNode;
}

const Modal: FC<IModalProps> & {
  Header: FC<IModalHeaderProps>;
  Content: FC<IModalContentProps>;
  Footer: FC<IModalFooterProps>;
} = ({ isOpen, onClose, children, theme = "light" }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const overlayClass = `${style.overlay} ${theme === "dark" ? style["overlay--dark"] : ""}`;
  const modalClass = `${style.modal} ${theme === "dark" ? style["modal--dark"] : ""}`;

  return (
    <div className={overlayClass} onClick={handleOverlayClick}>
      <div className={modalClass} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );
};

const ModalHeader: FC<IModalHeaderProps> = ({ 
  children, 
  onClose, 
  showCloseButton = true 
}) => {
  const hasClose = showCloseButton && onClose;
  return (
    <div className={style.header}>
      <h2 className={style.title}>{children}</h2>
      {hasClose && (
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
};

const ModalContent: FC<IModalContentProps> = ({ children }) => {
  return <div className={style.content}>{children}</div>;
};

const ModalFooter: FC<IModalFooterProps> = ({ children }) => {
  return <div className={style.footer}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;