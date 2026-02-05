import { FC, ReactNode, useEffect } from "react";
import style from "./Modal.module.css";
import Button from "../Button/Button";

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    showCloseButton?: boolean;
    theme?: "light" | "dark";
}

const Modal: FC<IModalProps> = ({ 
    isOpen, 
    onClose, 
    children, 
    title, 
    showCloseButton = true,
    theme = "light"
}) => {
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
    const headerClass = `${style.header} ${theme === "dark" ? style["header--dark"] : ""}`;

    return (
        <div className={overlayClass} onClick={handleOverlayClick}>
            <div className={modalClass} role="dialog" aria-modal="true">
                {(title || showCloseButton) && (
                    <div className={headerClass}>
                        {title && <h2 className={style.title}>{title}</h2>}
                        {showCloseButton && (
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
                )}
                <div className={style.content}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;