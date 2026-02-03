import { FC, ReactNode, useEffect } from "react";
import style from "./Modal.module.css";
import Button from "../Button/Button";

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    showCloseButton?: boolean;
}

const Modal: FC<IModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    showCloseButton = true,
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

    return (
        <div className={style.overlay} onClick={handleOverlayClick}>
            <div className={style.modal} role="dialog" aria-modal="true">
                {(title || showCloseButton) && (
                    <div className={style.header}>
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