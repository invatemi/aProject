import { ReactNode } from "react";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  theme?: "light" | "dark";
}

export interface IModalHeaderProps {
  children: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export interface IModalContentProps {
  children: ReactNode;
}

export interface IModalFooterProps {
  children: ReactNode;
}